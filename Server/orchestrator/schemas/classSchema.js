const axios = require('axios');
const redis = require('../config/redis');

const typeDefs = `#graphql
    type message {
        message: String
    }

    input ClassInput {
        name: String!,
        price: Int!
        quota: Int!
        SubjectId: Int!
        description: String!
        schedules: [schedule]!
        url: String!
    }

    input schedule {
        startDate: String,
        endDate: String
    }

    type Mutation {
        addClass(ClassInput:ClassInput): message
    }  
`

const resolver = {
    Mutation: {
        addClass: async (_, args) => {
            try {
                const { ClassInput } = args
                const { data } = await axios({
                    url: `http://localhost:3000/classes`,
                    method: 'POST',
                    data: ClassInput
                })
                await redis.del("app:classes")
                return data
            } catch (error) {
                return error.response.data
            }
        }
    }
}   

module.exports = {typeDefs, resolver}