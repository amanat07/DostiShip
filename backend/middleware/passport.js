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
                email.split("@")[0] +
                "_" +
                Date.now(),

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

