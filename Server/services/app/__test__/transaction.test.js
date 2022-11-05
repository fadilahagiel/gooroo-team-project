// const { queryInterface } = sequelize
const { User, Transaction, Class, sequelize, Subject, Student, Teacher } = require("../models");
const request = require('supertest')
const app = require('../app');
const { createToken } = require("../helpers/jwt");

const { queryInterface } = sequelize


const users = [
    {
        "username": "ahmad",
        "email": "ahmad@mail.com",
        "password": "12345",
        "role": "student",
        "saldo": 20000,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "budi",
        "email": "budi@mail.com",
        "password": "12345",
        "role": "teacher",
        "saldo": 30000,
        "createdAt": new Date(),
        "updatedAt": new Date() 
    }
];

const teachers = [
    {
        "fullName": "ahmad",
        "UserId": 2,
        "bio": "good teacher",
        "image": "foto.img",
        "averageRating": 7.5,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
]

const subjects = [
    {
        "name": "Matematika",
        "image": "foto.img",
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
]

const classes = [
    {
        "TeacherId": 1,
        "name": "Matematich Class",
        "price": 20000,
        "quota": 5,
        "averageRating": 7.5,
        "status": "On Progress",
        "SubjectId": 1,
        "description": "kelas bagus",
        "url": "google.com",
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
]

const students = [
    {
        "fullName": "Gio Septriadi",
        "image": "foto.img",
        "UserId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]
const transactions = [
    {
        "ClassId": 1,
        "StudentId": 1,
        "status": "unpaid",
        "rating": 8,
        "testimoni": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]

let payloadA = { id: 1 }
let validToken = createToken(payloadA)

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Teachers', teachers)
    await queryInterface.bulkInsert('Subjects', subjects)
    await queryInterface.bulkInsert('Classes', classes)
    await queryInterface.bulkInsert('Students', students)
    await queryInterface.bulkInsert('Transactions', transactions)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Teachers', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Subjects', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Classes', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Students', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Transactions', null, { truncate: true, restartIdentity: true, cascade: true })
})



//! enter class

describe.skip('POST /transactions', () => {
    test(`201 success enter class`, (done) => {
        request(app)
            .post('/transactions/1')
            .set("access_token", validToken)
            .then((response) => {
                console.log('masuk');
                const { body, status } = response
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("ClassId", 1);
                expect(body).toHaveProperty("StudentId", expect.any(Number));
                done();
            })
            .catch((err) => {
                done(err);
            });
    })
})