const express = require('express');
const app = express();
const { config } = require('./config/index');
const session = require('express-session');
const passport = require("passport");
let modo_cluster = process.argv[2] == "cluster";
const PORT = config.port;
const cors = require('cors');
let cluster = require('cluster');
const os = require('os');
const routes = require('./routes/store');
const authRoutes = require('./routes/auth');
const responseTime = require('response-time');
const logger = require('./config/loggers/pinoLog');
const cookieParser = require('cookie-parser');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} = graphql;
const {graphqlHTTP} = require('express-graphql');

//borrar esto despues
const {productosDao} = require('./models/daos/index')
//middlewares

app.use(responseTime());
app.use(cookieParser("es un secreto"));
app.use(session({
    secret: 'es un secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        exposedHeaders: ['x-auth-token']
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//graphql schema
const productoType = new GraphQLObjectType({
    name: 'Producto',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        code: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        timestamps: { type: GraphQLString }
    })
}
);

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: productoType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                code: { type: GraphQLString },
                thumbnail: { type: GraphQLString },
                price: { type: GraphQLFloat },
                stock: { type: GraphQLInt }
            },
            resolve(parent, args) {
                productosDao.save(args);
                return args;
            }
        }
    }
}
);

            

const rootQuery = new GraphQLObjectType({
    getAllProductos: {
        type: new GraphQLList(productoType),
        args: {
            id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return productosDao.getAll();
        }

}});
const schema = new GraphQLSchema({
    query: rootQuery, mutation: rootMutation
});



//routes
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use("/auth", authRoutes);
app.use("/api", routes);

//modo cluster

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


//app

app.use((req, res, next) => {
    res.status(404).send(
        logger.warn(`${req.method} ${req.url} 404 - no existe`),
    );
}
);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(
        logger.error(`${req.method} ${req.url} 500 - error`),
        err.stack
    );
}
);

