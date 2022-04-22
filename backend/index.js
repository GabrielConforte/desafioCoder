const cookieSession = require('cookie-session');
const express = require('express');
const passportSetup = require('./passport');
const passport = require('passport');
const app = express();
const { config,client } = require('./config/index');
const parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2));
const PORT = argv.p || config.port;

const cors = require('cors');
const authRoutes = require('./routes/auth');

const URL = client.client_url

app.use(cookieSession(
    {
        name: 'session',
        keys: ['keyes'],
        maxAge: 24 * 60 * 60 * 1000
    }

))

app.use(cors({
    origin: URL,
    methods: 'GET, POST, PUT, DELETE',
}));


//middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and the client its running on ${URL}`);
});

app.get('/info', (req, res) => {
    res.json({
        plataforma: process.platform,
        version: process.version,
        memoriaTotal: process.memoryUsage().heapTotal,
        path: process.cwd(),
        pid: process.pid,
        carpeta: __dirname
    });
    
});


app.use('/api/random/:cant', (req, res) => {
    if(req.params.cant){
    const { cant } = req.params;
    const num = parseInt(cant);
    const random = [];
    for (let i = 0; i < num; i++) {
        random.push(Math.floor(Math.random() * 1000));
    }
    res.json(random);
    }else{
        res.json(Math.floor(Math.random() * 100000));
    }
});