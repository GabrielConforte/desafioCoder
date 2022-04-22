const cookieSession = require('cookie-session');
const express = require('express');
const passportSetup = require('./passport');
const passport = require('passport');
const app = express();
const { config } = require('./config/index');
const cors = require('cors');
const PORT = config.port;
const authRoutes = require('./routes/auth');

app.use(cookieSession(
    {
        name: 'session',
        keys: ['keyes'],
        maxAge: 24 * 60 * 60 * 1000
    }

))

app.use(cors({
    origin: config.cors,
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));

//middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});