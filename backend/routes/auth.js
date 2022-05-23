const authRouter = require("express").Router();
const passport = require("passport");
const LocalPassport = require("../passport/passportConfig");
LocalPassport(passport);
const {config} = require("../config/index")
const {userDao} = require("../daos/index");
const bcrypt = require("bcryptjs");

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.post('/register', async (req, res) => {
    let usuario = req.body;
    usuario.rol = "user";
    let hash = await bcrypt.hashSync(usuario.password, 10);
    usuario.password = hash;
    let resultado = await userDao.comprobar(usuario.nombre, usuario.email);
 
    if (resultado === false) {
           await userDao.save(usuario, (err, result) => {
                if (err) {
                    //haz que se envie el status y un mensaje en json
                    res.status(500).json({
                        status: 500,
                        message: "Error al crear el usuario" + err
                    });
                }
            });
            res.status(200).json({
                status: 200,
                message: "El usuario se ha creado correctamente"
            });
     } else {
        res.status(500).json({
            status: 500,
            message: "El usuario ya existe"
        });
     }
}
);

authRouter.post('/login', checkNotAuthenticated, passport.authenticate('local'
//guarda en el sessionStorage el usuario
), (req, res) => {
    res.status(200).json({
        status: 200,
        message: "El usuario se ha logueado correctamente",
        user: req.user
    });
});

authRouter.post("/logout", (req, res) => {
    req.logout();
    res.json({
        status: 200,
        message: "Logout correcto"
    });
});

authRouter.get('/user',(req, res) => {
    if (req.user) {
        res.status(200).json({
            status: 200,
            user: {
                id: req.user.id,
                email: req.user.email,
                nombre: req.user.nombre,
                rol: req.user.rol
            }}
    ) }else {
        res.status(401).json({
            status: 401,
            message: "No autenticado"
        });
    }
        
});

    authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

    authRouter.get("/login/failed", (req, res) => {
    res.send("Login failed");
});

authRouter.get("/login/success", (req, res) => {
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

authRouter.get("facebook/callback", passport.authenticate("facebook", {
    successRedirect: `http://localhost:${config.port}`,
    failureRedirect: "/login/failed"
}));

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`http://localhost:${config.port}`);
});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('http://localhost:3000')
    }
    next()
  }
module.exports = authRouter;
