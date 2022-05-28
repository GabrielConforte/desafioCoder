
const passport = require("passport")
const {config, client} = require("../index")
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID:  client.client_id_fb,
    clientSecret: client.client_secret_fb,
    callbackURL: `http://localhost:${config.port}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
})

module.exports = passport;