const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,          // ✅ MUST BE THIS
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // ✅ MUST BE THIS
    callbackURL: "http://localhost:5000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {

        const email =
            profile.emails[0].value;

        // ONLY CHITKARA EMAILS
        if (
            !email.endsWith(
                "@chitkara.edu.in"
            )
        ) {

            return done(
                null,
                false,
                {
                    message:
                        "Only Chitkara emails allowed",
                }
            );

        }

        let user = await User.findOne({
            email,
        });

        if (user)
            return done(null, user);

        user = new User({
            name: profile.displayName,

            username:
email
  .replace("@chitkara.edu.in", "")
  .toLowerCase(),

            email,

            password:
                "google_oauth_" +
                Date.now(),

            gender: "Other",

            profilePic:
                profile.photos[0]?.value ||
                "",
        });

        await user.save();

        return done(null, user);

    } catch (err) {

        return done(err, null);

    }
}
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;