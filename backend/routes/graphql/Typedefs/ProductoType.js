const graphql = require('graphql');
const {GraphQLObjectType,  GraphQLInt, GraphQLString, GraphQLFloat} = graphql;

const ProductoType = new GraphQLObjectType({
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

module.exports = ProductoType;