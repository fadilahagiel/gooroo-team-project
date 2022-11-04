// const { queryInterface } = sequelize
const { User, Transaction, Class, sequelize, Subject } = require("../models");
const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

let validToken, validToken2, invalidToken;

const user1 = {
    email: "user1@mail.com",
    password: "12345",
};

const user2 = {
    email: "user2@mail.com",
    password: "12345",
};

beforeAll((done) => {
    User.create(user1)
        .then((registeredUser) => {
            validToken = jwt.sign({
                id: registeredUser.id,
                email: registeredUser.email,
            }, 'RAHASIA');
            invalidToken =
                "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            return User.create(user2);
        })
        .then((registeredUser2) => {
            validToken2 = jwt.sign({
                id: registeredUser2.id,
                email: registeredUser2.email,
            }, 'RAHASIA');
            return queryInterface.bulkInsert('Classes',
                [
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
                ],
                {}
            );
        })
        .then(() => {
            return queryInterface.bulkInsert('Students',
                [
                    {
                        "fullName": "Gio Septriadi",
                        "image": "foto.img",
                        "UserId": 1,
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                ],
                {}
            );
        })
        .then(() => {
            return queryInterface.bulkInsert('Transactions',
                [
                    {
                        "ClassId": 1,
                        "StudentId": 1,
                        "status": "unpaid",
                        "rating": 8,
                        "testimoni": null,
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                ],
                {}
            );
        })
        .catch((err) => {
            done(err);
        });
});

afterAll(done => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then(_ => {
            return Transaction.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return Subject.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return Class.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

//! enter class

describe('POST /transactions', () => {
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
                expect(body).toHaveProperty("status", "unpaid");
                done();
            })
            .catch((err) => {
                done(err);
            });
    })
})