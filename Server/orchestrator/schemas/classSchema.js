const axios = require('axios');
const redis = require('../config/redis');

const typeDefs = `#graphql
    type message {
        message: String
    }

    type Class {
        name: String
        price: Int
        quota: Int
        averageRating: Int
        status: String
        SubjectId: Int
        description: String
        url: String
    }

    input ClassInput {
        name: String!
        price: Int!
        quota: Int!
        SubjectId: Int!
        description: String!
        schedules: [schedule]!
        url: String!
        Schedules: [schedule]
    }

    input schedule {
        startDate: String,
        endDate: String
    }

    type Query {
        getClass(): [Class]
    }

    type Mutation {
        addClass(ClassInput:ClassInput): message
    }  
`

const resolver = {
    Quary: {
        getClass: async () => {
            try {
                
            } catch (error) {
                next(error)
            }
        }  
    },
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