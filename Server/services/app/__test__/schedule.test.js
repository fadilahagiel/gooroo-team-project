const { createToken } = require("../helpers/jwt");
const { User, Schedule, sequelize } = require("../models");
const request = require('supertest')
const app = require('../app');
const { queryInterface } = sequelize

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

const schedules = [
    {
        "startDate": new Date(),
        "endDate": new Date(),
        "ClassId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "startDate": new Date(),
        "endDate": new Date(),
        "ClassId": 1,
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

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Teachers', teachers)
    await queryInterface.bulkInsert('Subjects', subjects)
    await queryInterface.bulkInsert('Classes', classes)
    await queryInterface.bulkInsert('Schedules', schedules)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Teachers', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Subjects', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Schedules', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Classes', null, { truncate: true, restartIdentity: true, cascade: true })
})

let payloadTeacher = { id: 2 }
let validTokenTeacher = createToken(payloadTeacher)
let payloadStudent = { id: 1 }
let validTokenStudent = createToken(payloadStudent)

describe("POST schedule test /schedules/:ClassId", () => {
    test("201 success POST schedules", (done) => {
        request(app)
            .post(`/schedules/1`)
            .set("access_token", validTokenTeacher)
            .send({
                "startDate": new Date(),
                "endDate": new Date(),
            })
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                expect(body).toHaveProperty("message", "Success add new schedule");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed POST schedules, role is not teacher", (done) => {
        request(app)
            .post(`/schedules/1`)
            .set("access_token", validTokenStudent)
            .send({
                "startDate": new Date(),
                "endDate": new Date(),
            })
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("failed POST schedules, class not found", (done) => {
        request(app)
            .post(`/schedules/99`)
            .set("access_token", validTokenTeacher)
            .send({
                "startDate": new Date(),
                "endDate": new Date(),
            })
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Class not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});


describe("UPDATE schedule test /schedules/:ClassId", () => {
    test("success UPDATE schedules", (done) => {
        request(app)
            .put(`/schedules/1`)
            .set("access_token", validTokenTeacher)
            .send({
                "startDate": new Date(),
                "endDate": new Date(),
            })
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Schedule has been update");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed update schedules, not found", (done) => {
        request(app)
            .put(`/schedules/44`)
            .send({
                "startDate": new Date(),
                "endDate": new Date(),
            })
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed UPDATE schedules, role is not teacher", (done) => {
        request(app)
            .put(`/schedules/2`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("DELETE schedule test /schedules/:ScheduleId", () => {
    test("success DELETE schedules", (done) => {
        request(app)
            .delete(`/schedules/1`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Success delete schedule");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
    
    test("failed DELETE schedules, not found", (done) => {
        request(app)
            .delete(`/schedules/44`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed DELETE schedules, role is not teacher", (done) => {
        request(app)
            .delete(`/schedules/2`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    
});

