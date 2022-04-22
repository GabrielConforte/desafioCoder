const router = require("express").Router();
const passport = require("passport");
const {config} = require("../config/index")

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get("/login/failed", (req, res) => {
    res.send("Login failed");
});

router.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json(
            {
                user: req.user,
                message: "Login success",
                redirect: `http://localhost:${config.port}/info`,
                cookies: req.cookies
            }
        )
    }
});

router.get("facebook/callback", passport.authenticate("facebook", {
    successRedirect: `http://localhost:${config.port}`,
    failureRedirect: "/login/failed"
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`http://localhost:${config.port}`);
});

module.exports = router;
