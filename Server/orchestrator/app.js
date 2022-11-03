if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const port = process.env.PORT || 4000;
const transactionSchema = require('./schemas/transactionSchema')
const classSchema = require('./schemas/classSchema')

const server = new ApolloServer({
    typeDefs: [transactionSchema.typeDefs, classSchema.typeDefs],
    resolvers: [transactionSchema.resolver, classSchema.resolver],
    playground: true,
    introspection: true
})

startStandaloneServer(server, {
    listen: {port: 4000}
}).then(({ url }) => {
    console.log(`graphQL running at port ${port}`);
})