const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,          // ✅ MUST BE THIS
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // ✅ MUST BE THIS
    callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) return done(null, user);

        user = new User({
            name: profile.displayName,
            username: profile.emails[0].value.split("@")[0] + "_" + Date.now(),
            email: profile.emails[0].value,
            password: "google_oauth_" + Date.now(),
            gender: "Other",
            profilePic: profile.photos[0]?.value || ""
        });

        await user.save();
        return done(null, user);

    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;