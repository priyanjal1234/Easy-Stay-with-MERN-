const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateVerificationCode,
} = require("../utils/generateVerificationCode");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports.registerUser = async function (req, res) {
  let { name, email, password, address, phoneNumber, isAdmin } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
      address,
      phoneNumber,
      isAdmin: email === "priyanjal362@gmail.com" ? true : false,
    });

    let verificationCode = generateVerificationCode();

    if (user) {
      user.verificationCode = verificationCode;
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "priyanjal362@gmail.com",
        pass: "enex jzjc rsel ulsv",
      },
    });

    const mailOptions = {
      from: "priyanjal362@gmail.com",
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
    });

    res.status(201).json({ message: "Check Your Email For Verification Code" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.verifyUserEmail = async function (req, res) {
  let { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    if (Number(user.verificationCode) === Number(verificationCode)) {
      user.verificationCode = null;
      user.isVerified = true;
      await user.save();
      let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
      res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
      return res.status(200).json({ message: "Email Verified Successfully" });
    } else {
      return res.status(401).json({ message: "Invalid Verification Code" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Login Success" });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getLoggedinUser = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateLoggedinUser = async function (req, res) {
  let { name, address, phoneNumber } = req.body;
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let updatedUser = await userModel.findOneAndUpdate(
      { email: req.user.email },
      {
        name: name || user.name,
        address: address || user.address,
        phoneNumber: phoneNumber || user.phoneNumber,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Error Updating User" });
    }
    res.status(200).json({ message: "Profile is updated successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.forgotPassword = async function (req, res) {
  try {
    let { email } = req.body;
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    let resettoken = crypto.randomBytes(10).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();

    let reseturl = `http://localhost:5173/reset-password/${resettoken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can also use other services like "Outlook", "Yahoo"
      auth: {
        user: "priyanjal362@gmail.com",
        pass: "enex jzjc rsel ulsv", // Your email's app password
      },
    });

    const mailOptions = {
      from: "priyanjal362@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to reset your password:</p>
      <a href="${reseturl}" target="_blank">${reseturl}</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Thanks,</p>
      <p>Easy Stay MERN</p>
    `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Check Your Email to Reset Your Password" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.resetPassword = async function (req, res) {
  try {
    let user = await userModel.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "User with the token not  fo und" });
    let { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    let newSalt = await bcrypt.genSalt(10);
    let newHash = await bcrypt.hash(password, newSalt);

    user.password = newHash;

    await user.save();

    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
