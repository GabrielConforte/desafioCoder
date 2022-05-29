const authRouter = require("express").Router();
const passport = require("passport");
const LocalPassport = require("../config/passport/passportConfig");
LocalPassport(passport);
const {config} = require("../config/index")
const {userDao} = require("../models/daos/index");
const {isAdmin} = require("../models/daos/index");
const bcrypt = require("bcryptjs");
const logger = require('../config/loggers/pinoLog');
const fs = require("fs");
const {transporter} = require("../config/mailer/mailer");

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    }
    , filename: function (req, file, cb) {
        //a file name quitale la extensión
        cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
}
)
const upload = multer({ storage: storage })

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get("/check/:email", async (req, res) => {
    const {email} = req.params;
    let user = await isAdmin.getUserByEmail(email);
    if(user){
        res.status(200).json({isAdmin: true});
    }
    else{
        res.status(200).json({isAdmin: false});
    }
})

authRouter.post('/asignar/:email', async (req, res) => {
    const {email} = req.params
    let user = await userDao.getUserByEmail(email)
    if(user){
        let admin = {
            email: user.email,
            nombre: user.nombre,
        }
        await isAdmin.save(admin)
        res.status(200).json({message: "Usuario asignado como administrador"})
    }
    ;})

authRouter.post('/register', upload.single('file'), async (req, res) => {
    
    try {
        let usuario = req.body;
        let hash = await bcrypt.hashSync(usuario.password, 10);
        usuario.password = hash;
        let resultado = await userDao.comprobar(usuario.nombre, usuario.email);
        usuario.img = req.file.filename;
        if (resultado === false) {
            await userDao.save(usuario, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Error al crear el usuario" + err
                        });
                    }
                   
                });
                try{
                    await transporter.sendMail({
                        from: `"admin" <${config.mailer.mailer_user}>`,
                        to: config.mailer.mailer_user,
                        subject: 'Nuevo usuario registrado',
                        html: '<h1>Nuevo usuario registrado</h1>' +
                        '<p>El usuario ' + usuario.nombre + ' se ha registrado en la aplicación</p>'
                    });
                }
                catch(err){
                    logger.info(err);
                }
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
    catch (error) {
        logger.error(error);
    }
    }
);

authRouter.post('/login', checkNotAuthenticated, passport.authenticate('local'

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
