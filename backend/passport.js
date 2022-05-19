
const passport = require("passport")
const {client} = require("./config/index")
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID:  client.client_id_fb,
    clientSecret: client.client_secret_fb,
    callbackURL: `${client.client_url}/auth/facebook/callback`,
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