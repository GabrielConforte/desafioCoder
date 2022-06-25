const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} = graphql;
const {productosDao, userDao} = require('../models/daos/index')
const {productoType} = require('./Typedefs/ProductoType');

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
        },
        editProducto: {
            type: productoType,
            args: {
                id: { type: GraphQLString },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                code: { type: GraphQLString },
                thumbnail: { type: GraphQLString },
                price: { type: GraphQLFloat },
                stock: { type: GraphQLInt }
            },
            resolve(parent, args) {
                productosDao.update(args);
                return args;
            }
        },
        deleteProducto: {
            type: productoType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                productosDao.delete(args);
                return args;
            }
        },
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                userDao.save(args);
                return args;
            }

    },
        editUser: {
            type: userType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                userDao.update(args);
                return args;
            }
        },
        deleteUser: {
            type: userType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                userDao.delete(args);
                return args;
            }
        }
}
});

            

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
    getAllProductos: {
        type: new GraphQLList(productoType),
        args: {
            _id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return productosDao.getAll();
        }
    },
    getAllUser:
    {
        type: new GraphQLList(userType),
        args: {
            _id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return userDao.getAll();
        }

}, 
    getProducto: {
        type: productoType,
        args: {
            _id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return productosDao.get(args);
        }
    },
    getUser: {
        type: userType,
        args: {
            _id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return userDao.get(args);
        }
    }
}});
module.exports = new GraphQLSchema({
    query: rootQuery, mutation: rootMutation
});
