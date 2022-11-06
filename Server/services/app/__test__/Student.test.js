const { User, sequelize, Student, Teacher, Class, Transaction } = require("../models");
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
    },
    {
        "username": "juned",
        "email": "juned@mail.com",
        "password": "12345",
        "role": "student",
        "saldo": 20000,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "pascal",
        "email": "pascal@mail.com",
        "password": "12345",
        "role": "student",
        "saldo": 20000,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
];

const teachers = [
    {
        "fullName": "budi",
        "UserId": 2,
        "bio": "good teacher",
        "image": "foto.img",
        "averageRating": 7.5,
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
    },
    {
        "fullName": "Pascal Septriadi",
        "image": "foto.img",
        "UserId": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
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

const transactions = [
    {
        "ClassId": 1,
        "StudentId": 1,
        "rating": 8,
        "testimoni": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "ClassId": 1,
        "StudentId": 2,
        "rating": 8,
        "testimoni": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]

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
})

let payloadTeacher = { id: 2 }
let validTokenTeacher = createToken(payloadTeacher)

let payloadTeacher2 = { id: 4 }
let validTokenTeacher2 = createToken(payloadTeacher2)

let payloadStudent = { id: 1 }
let validTokenStudent = createToken(payloadStudent)

let payloadNewStudent = { id: 3 }
let validTokenNewStudent = createToken(payloadNewStudent)


describe("show one student Test", () => {
    test("Success show one student", (done) => {
        request(app)
            .get("/students")
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;

                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("fullName", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                expect(body).toHaveProperty("image", expect.any(String));
                return done();
            });
    });

    test("failed show one student, student not found", (done) => {
        request(app)
            .get("/students")
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            });
    });

    test("failed show one student, invalid token", (done) => {
        request(app)
            .get("/students")
            .set("access_token", "token salah")
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                return done();
            });
    });
});

describe("Post student Test", () => {
    test("Success post student", (done) => {
        request(app)
            .post("/students")
            .field("fullName", "zianurr")
            .attach('image', '/foto/foto.png')
            .set("access_token", validTokenNewStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("fullName", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                expect(body).toHaveProperty("image", expect.any(String));
                return done();
            });
    });

    test("failed post student, already created", (done) => {
        request(app)
            .post("/students")
            .field("fullName", "zianurr")
            .attach('image', '/foto/foto.png')
            .set("access_token", validTokenNewStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "You already made a profile");
                return done();
            });
    });

    test("failed post student, role is not student", (done) => {
        request(app)
            .post("/students")
            .field("fullName", "zianurr")
            .attach('image', '/foto/foto.png')
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            });
    });

});

describe("Edit student Test", () => {

    test("Success edit student", (done) => {
        request(app)
            .put("/students")
            .send({
                fullName: "edited",
                image: "image.jpg"
            })
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Student profile has been updated");
                return done();
            });
    });

    test("failed edit student, student not found", (done) => {
        request(app)
            .put("/students")
            .send({
                fullName: "edited",
                image: "image.jpg"
            })
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            });
    });

});

describe("Get My Student Test", () => {
    test("Success get my student /students/:classId", (done) => {
        request(app)
            .get("/students/1")
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();
                return done();
            });
    });

    test("failed get my student /students/:classId", (done) => {
        request(app)
            .get("/students/1")
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            });
    });
})
