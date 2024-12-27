const passport = require("passport");
const userModel = require("../models/user-model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      prompt: "consent",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "passwordlessauthentication",
            isVerified: true,
            isAdmin:
              profile.emails[0].value === "priyanjal362@gmail.com"
                ? true
                : false,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findOne({ id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
