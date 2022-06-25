const graphql = require('graphql');
const {GraphQLObjectType,  GraphQLInt, GraphQLString, GraphQLFloat} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        timestamps: { type: GraphQLString }
    })
}
);

module.exports = UserType;