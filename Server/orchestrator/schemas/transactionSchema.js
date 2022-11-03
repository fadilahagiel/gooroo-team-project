const axios = require('axios');
const redis = require('../config/redis');

const typeDefs = `#graphql
    type Transaction {
        id: ID
        ClassId: ID
        StudentId: ID
        status: String
        rating: Int
        testimoni: String
        Student: Student
    }

    type Student{
        id: ID
        fullName: String
        image: String
        UserId: Int
    }

    type Message {
        message: String
    }

    input studentResponse {
        testimoni: String
        rating: Int
    }

    type Query {
        getTransaction(id:ID): Transaction
    }

    type Mutation{
        addTransaction(id:ID): Transaction
        collectTransaction(id:ID): Message
        studentResponse(id:ID, studentResponse: studentResponse): Message
    }
`

const resolver = {
    Query: {
        getTransaction: async (_, args) => {
            try {
                const { id } = args
                const transactionCache = await redis.get(`app:transactions:${id}`)
                if (transactionCache) {
                    return JSON.parse(transactionCache)
                }
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/transactions/${id}`
                })
                await redis.set(`app:transactions:${id}`, JSON.stringify(data))
                return data
            } catch (error) {
                return error.response.data
            }
        }
    },
    Mutation: {
        addTransaction: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'POST',
                    url: `http://localhost:3000/transactions/${id}`
                })
                await redis.del("app:transactions")
                return data
            } catch (error) {
                return error.response.data
            }
        },
        collectTransaction: async (_, args) => {
            try {
                const { id } = args

                const { data } = await axios({
                    method: 'PATCH',
                    url: `http://localhost:3000/transactions/${id}`
                })
                await redis.del("app:transactions")
                return data
            } catch (error) {
                return error.response.data
            }
        },
        studentResponse: async (_, args) => {
            try {
                const { id } = args
                const { studentResponse } = args
                const { data } = await axios({
                    url: `http://localhost:3000/transactions/${id}`,
                    method: 'PUT',
                    data: studentResponse
                })
                await redis.del("app:transactions")
                return data
            } catch (error) {
                return error.response.data
            }
        }
    }
}

module.exports = {typeDefs, resolver}