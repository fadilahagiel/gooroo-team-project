const axios = require("axios");
const redis = require("../config/redis");
const urlBase = "http://localhost:3000";

const typeDefs = `#graphql

    type message {
        message: String
    }

    type Class {
        id: ID
        TeacherId: Int
        name: String
        price: Int
        quota: Int
        averageRating: String
        status: String
        SubjectId: Int
        description: String
        url: String
        Teacher: Teacher
        Subject: Subject
        Schedules: [schedules]
    }

    type Subject{
        id: ID
        name: String
        image: String
    
    }
    type schedules {
        id: ID
        ClassId: Int
        startDate: String
        endDate: String
    }

    type Teacher{
        id: ID
        fullName: String
        UserId: Int
        bio: String
        image: String
        averageRating: String
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

    input InputEditClass{
        name: String
        price: Int
        quota: Int
        SubjectId: Int
        description: String
        url:String
    }

    input schedule {
        startDate: String,
        endDate: String
    }

    type Query {
        getClasses(access_token: String): [Class]
        getOneClass(access_token: String, ClassId:Int): Class
    }

    type Mutation {
        addClass(ClassInput:ClassInput, access_token: String): message
        deleteClass(access_token: String, ClassId: ID): message
        updateClass(ClassId: ID, editClass: InputEditClass, access_token: String):message
    }  
`;

const resolver = {
    Query: {
        getClasses: async (_, args) => {
        try {
            const { access_token } = args;
            const { data } = await axios({
            method: "get",
            url: `${urlBase}/classes`,
            headers: {
                access_token,
            },
            });
            return data;
        } catch (error) {
            return error.response.data;
        }
        },
        getOneClass: async (_, args) => {
        try {
            const { access_token, ClassId } = args;
            const { data } = await axios({
            method: "get",
            url: `${urlBase}/classes/${ClassId}`,
            headers: {
                access_token,
            },
            });
            return data;
        } catch (error) {
            return error.response.data;
        }
        },
    },
    Mutation: {
        addClass: async (_, args) => {
        try {
            const { access_token, ClassInput } = args;
            const { data } = await axios({
            url: `${urlBase}/classes`,
            method: "POST",
            data: ClassInput,
            headers: {
                access_token,
            },
            });
            await redis.del("app:classes");
            return data;
        } catch (error) {
            return error.response.data;
        }
        },
        deleteClass: async (_, args) => {
        try {
            const { access_token, ClassId } = args;
            const { data } = await axios({
            method: "delete",
            url: `${urlBase}/classes/${ClassId}`,
            headers: {
                access_token,
            },
            });
            return data;
        } catch (error) {
            return error.response.data;
        }
        },
        updateClass: async (_, args) => {
        try {
            const { ClassId, editClass, access_token } = args;
            console.log(ClassId, editClass);
            const { data } = await axios({
            method: "put",
            url: `${urlBase}/classes/${ClassId}`,
            headers: {
                access_token,
            },
            data: editClass,
            });
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
        },
    },
};


module.exports = { typeDefs, resolver };
