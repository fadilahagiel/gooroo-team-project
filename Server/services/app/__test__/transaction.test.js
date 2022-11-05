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
        "rating": 8,
        "testimoni": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]

let payloadA = { id: 1 }
let validToken = createToken(payloadA)
let payloadTeacher = { id: 2 }
let teacherToken = createToken(payloadTeacher)

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

describe('POST /transactions', () => {
    test(`201 success post transaction`, (done) => {
        request(app)
            .post('/transactions/1')
            .set("access_token", validToken)
            .then((response) => {
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

    test(`failed post transaction, class not found`, (done) => {
        request(app)
            .post('/transactions/99')
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed post transaction, role is not student`, (done) => {
        request(app)
            .post('/transactions/1')
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed post transaction, invalid token`, (done) => {
        request(app)
            .post('/transactions/1')
            .set("access_token", "salah")
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })
})

describe(`PATCH collect class's profit /transactions/:ClassId`, () => {
    test(`success PATCH transaction`, (done) => {
        request(app)
            .patch('/transactions/1')
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "You earned 40000 from Matematich Class");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })
    test(`failed PATCH transaction`, (done) => {
        request(app)
            .patch('/transactions/1')
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "You already collected this class's profit");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed PATCH transaction, wrong teacher.id`, (done) => {
        request(app)
            .patch('/transactions/1')
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })
    
})

describe(`GET one transaction /transactions/:id`, () => {
    test(`success GET one transaction`, (done) => {
        request(app)
            .get('/transactions/1')
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("ClassId", expect.any(Number));
                expect(body).toHaveProperty("StudentId", expect.any(Number));
                expect(body).toHaveProperty("rating", expect.any(String));
                expect(body).toHaveProperty("testimoni");
                expect(body).toHaveProperty("Student");
                expect(body).toHaveProperty("Class");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })
    
    test(`failed GET one transaction, not found`, (done) => {
        request(app)
            .get('/transactions/99')
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed GET one transaction invalid token`, (done) => {
        request(app)
            .get('/transactions/1')
            .set("access_token", "salah")
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

})

describe(`PUT transaction, student response /transactions/:id`, () => {
    test(`success PUT transaction`, (done) => {
        request(app)
            .put('/transactions/1')
            .send({
                rating: 8,
                testimoni: "seru"
            })
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Berhasil memberi testimoni");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`success PUT transaction`, (done) => {
        request(app)
            .put('/transactions/1')
            .send({
                rating: 8,
            })
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "testimoni & raring are required");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed PUT transaction, not found`, (done) => {
        request(app)
            .put('/transactions/99')
            .send({
                rating: 8,
                testimoni: "seru"
            })
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

    test(`failed PUT transaction, forbidden`, (done) => {
        request(app)
            .put('/transactions/1')
            .send({
                rating: 8,
                testimoni: "seru"
            })
            .set("access_token", teacherToken)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })
    test(`failed PUT transaction, invalid token`, (done) => {
        request(app)
            .put('/transactions/1')
            .send({
                rating: 8,
                testimoni: "seru"
            })
            .set("access_token", "salah")
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    })

})