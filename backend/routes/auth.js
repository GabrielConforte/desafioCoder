const router = require("express").Router();
const passport = require("passport");
const {client} = require("../config/index")

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/login/failed", (req, res) => {
    res.send("Login failed");
});

router.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json(
            {
                user: req.user,
                message: "Login success",
                redirect: client.client_url,
                cookies: req.cookies
            }
        )
    }
});

router.get("facebook/callback", passport.authenticate("facebook", {
    successRedirect: client.client_url,
    failureRedirect: "/login/failed"
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(client.client_url);
});

module.exports = router;
