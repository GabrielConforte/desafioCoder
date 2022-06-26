const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} =  require('graphql');

const ProductoType = require('./Typedefs/ProductoType');
const userType = require('./Typedefs/UserType');
const {productosDao, userDao} = require('../../models/daos/index')

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
    getAllProductos: {
        type: new GraphQLList(ProductoType),
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
        type: ProductoType,
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

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductoType,
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
            type: ProductoType,
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
            type: ProductoType,
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


module.exports = new GraphQLSchema({
    query: rootQuery, mutation: rootMutation
});
