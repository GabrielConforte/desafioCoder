
const express = require('express');
const app = express();
const { config,client } = require('./config/index');

const cookieSession = require('cookie-session');
const {fork} = require('child_process');
const passport = require('passport');

const _yargs = require('yargs');

const yargs = _yargs(process.argv.slice(2))
const PORT = yargs.argv.port || config.port;
const MODO = yargs.argv.modo;

const cors = require('cors');
const authRoutes = require('./routes/auth');
const URL = client.client_url

let cluster = require('cluster');
const os = require('os');

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

app.get('/info', (req, res) => {
    res.json({
        plataforma: process.platform,
        version: process.version,
        memoriaTotal: process.memoryUsage().heapTotal,
        path: process.cwd(),
        pid: process.pid,
        carpeta: __dirname,
        cpuNum: os.cpus().length,
    });
    
});


app.use('/api/random/:cant', (req, res) => {
    const { cant } = req.params;
    const child = fork('./utils/child.js');
    child.send(cant);

    child.on('message', (message) => {
        console.log(message)
        res.json(message);
    });

    child.on("exit", (code)=>{
        console.log("CHILD EXITED", code);
    });
});

app.use('/api/random/', (req, res) => {
    
    const child = fork('./utils/child.js');
    child.send(1000);

    child.on('message', (message) => {
        console.log(message)
        res.json(message);
    });

    child.on("exit", (code)=>{
        console.log("CHILD EXITED", code);
    });
});

app.use("/saludo", (req, res) => {
    res.json({
        saludo: "Hola"
    });
});

app.get("/datos", (req, res) => {
    res.json({response: `PORT ${PORT}, PID: ${process.pid}, FyH: ${new Date().getUTCDate()}`});
});

if(cluster.isMaster || MODO === "cluster"){
    console.log(`Master ${process.pid} is running`)
        const cpuCount = os.cpus().length
        for(let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
}else{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}, Worker PID: ${process.pid}, FyH: ${new Date()}`);
    }); 
}