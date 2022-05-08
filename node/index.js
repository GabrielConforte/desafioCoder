
const express = require('express');
const app = express();
const { config,client } = require('./config/index');

const cookieSession = require('cookie-session');
const {fork} = require('child_process');
const passport = require('passport');


let modo_cluster = process.argv[2] == "cluster";

const PORT = config.port;


const cors = require('cors');
const authRoutes = require('./routes/auth');
const URL = client.client_url

let cluster = require('cluster');
const os = require('os');

const routes = require('./routes/store.routes');
const responseTime = require('response-time');
let gzip = require('compression');

const logger = require('./config/loggers/pinoLog');

logger.info(modo_cluster)
app.use(responseTime());
//app.use(gzip());
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
    logger.info(`${req.method} ${req.url}`);
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

app.get('/infozip', gzip(), async (req, res, next) => {

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

if(modo_cluster && cluster.isMaster){
    logger.info(`Master ${process.pid} is running`)
        const cpuCount = os.cpus().length
        for(let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died`)
        })
}else{
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}, Worker PID: ${process.pid}`);
    }); 
}

//ruta del api
app.use("/api",routes);

//hagamos rutas en caso de que no exista
app.use((req, res, next) => {
    res.status(404).send(
        logger.warn(`${req.method} ${req.url} 404 - no existe`),
        
        
    );
}
);

//como puedo crear un archivo que guarde los errores en un archivo de texto?
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(
        logger.error(`${req.method} ${req.url} 500 - error`),
        err.stack
    );
}
);