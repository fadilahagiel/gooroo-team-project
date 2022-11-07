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
    }
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

let payloadStudent = { id: 1 }
let invalidToken = 'salah'
let validTokenStudent = createToken(payloadStudent)

let payloadTeacher = { id: 2 }
let validTokenTeacher = createToken(payloadTeacher)

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Teachers', teachers)
    await queryInterface.bulkInsert('Subjects', subjects)
    await queryInterface.bulkInsert('Classes', classes)
    await queryInterface.bulkInsert('Students', students)
    // await queryInterface.bulkInsert('Transactions', transactions)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Teachers', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Subjects', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Classes', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Students', null, { truncate: true, restartIdentity: true, cascade: true })
})

describe("GET /classes", () => {
    test("200 success get classes", (done) => {
        request(app)
            .get("/classes")
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();
                expect(body.length).toBeGreaterThan(0);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 Failed get classes - should return error invalid token", (done) => {
        request(app)
            .get("/heroes")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("GET /classes/:ClassId", () => {
    test("200 success GET one class", (done) => {
        request(app)
            .get(`/classes/1`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("TeacherId", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("price", expect.any(Number));
                expect(body).toHaveProperty("quota", expect.any(Number));
                expect(body).toHaveProperty("averageRating", expect.any(String));
                expect(body).toHaveProperty("status", expect.any(String));
                expect(body).toHaveProperty("SubjectId", expect.any(Number));
                expect(body).toHaveProperty("description", expect.any(String));
                expect(body).toHaveProperty("url", expect.any(String));
                expect(body).toHaveProperty("Schedules", expect.any(Array));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 Failed get one class - should return error invalid token", (done) => {
        request(app)
            .get(`/classes/1`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("404 GET ONE class not found", (done) => {
        request(app)
            .get(`/classes/99`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Class not found");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /classes", () => {
    test("201 success POST class", (done) => {
        request(app)
            .post(`/classes`)
            .set("access_token", validTokenTeacher)
            .send({
                "name": "kelas tes",
                "price": 10000,
                "quota": 5,
                "SubjectId": 1,
                "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "url": "ini link",
                "schedules": [
                    {
                        "startDate": "2022-11-04 19:19:17.676 +0700",
                        "endDate": "2022-11-04 19:19:17.676 +0700"
                    }
                ]
            })
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                expect(body).toHaveProperty("message", "Berhasil membuat kelas kelas tes");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("failed POST class wrong access_token", (done) => {
    request(app)
        .post(`/classes`)
        .set("access_token", "salah")
        .send({
            "name": "kelas tes",
            "price": 10000,
            "quota": 5,
            "SubjectId": 1,
            "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            "url": "ini link",
            "schedules": [
                {
                    "startDate": "2022-11-04 19:19:17.676 +0700",
                    "endDate": "2022-11-04 19:19:17.676 +0700"
                }
            ]
        })
        .then((response) => {
            const { body, status } = response;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "invalid_token");
            done();
        })
        .catch((err) => {
            done(err);
        });
    });

});


describe("UPDATE /classes/:ClassId", () => {
    test("201 success UPDATE class", (done) => {
        request(app)
            .put(`/classes/1`)
            .set("access_token", validTokenTeacher)
            .send({
                "name": "kelas edit",
                "price": 10000,
                "quota": 5,
                "SubjectId": 1,
                "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "url": "ini link",
            })
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("201 failed UPDATE class invalid token", (done) => {
        request(app)
            .put(`/classes/1`)
            .set("access_token", "salah")
            .send({
                "name": "kelas edit",
                "price": 10000,
                "quota": 5,
                "SubjectId": 1,
                "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "url": "ini link",
            })
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("201 failed UPDATE class role is not teacher", (done) => {
        request(app)
            .put(`/classes/1`)
            .set("access_token", validTokenStudent)
            .send({
                "name": "kelas edit",
                "price": 10000,
                "quota": 5,
                "SubjectId": 1,
                "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "url": "ini link",
            })
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("201 failed UPDATE class, class not found", (done) => {
        request(app)
            .put(`/classes/99`)
            .set("access_token", validTokenTeacher)
            .send({
                "name": "kelas edit",
                "price": 10000,
                "quota": 5,
                "SubjectId": 1,
                "description": "baru nihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "url": "ini link",
            })
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Class not found");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

});

describe("DELETE /classes/:ClassId", () => {
    test("200 failed DELETE class, invalid token", (done) => {
        request(app)
            .delete(`/classes/1`)
            .set("access_token", 'salah')
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", 'invalid_token');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("200 failed DELETE class, role is not teacher", (done) => {
        request(app)
            .delete(`/classes/1`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", 'forbidden');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("200 failed DELETE class, class not found", (done) => {
        request(app)
            .delete(`/classes/99`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", 'Class not found');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("200 success DELETE class", (done) => {
        request(app)
            .delete(`/classes/1`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

