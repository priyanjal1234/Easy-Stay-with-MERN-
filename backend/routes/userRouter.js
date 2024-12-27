const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedinUser,
  updateLoggedinUser,
  verifyUserEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { isLoggedin } = require("../middlewares/isLoggedin");
const passport = require("passport");

router.post("/register", registerUser);

router.post("/verify-email", verifyUserEmail);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/profile", isLoggedin, getLoggedinUser);

router.put("/update/profile", isLoggedin, updateLoggedinUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/register",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/auth/success", function (req, res) {
  if (req.user) {
    res.json({ user: req.user }); // Send logged-in user data to the frontend
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
