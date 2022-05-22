
const {userDao} = require("../daos/index");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportLocal= require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

const LocalPassport = (passport) => {
passport.use(new passportLocal({
  usernameField: 'email',
  session: false
}, async (email, password, done) => {
  try{
      const user = await userDao.collection.findOne({email: email});
      if(!user){
          return done(null, false, { message: 'Usuario no existe' });
      }
      const result = await bcrypt.compare(password, user.password);
      if(result){
          return done(null, user);
      }else{
          return done(null, false, { message: 'Contraseña incorrecta' });
      }
  }catch(err){
      done(err);
  }
}))
}

module.exports = LocalPassport;