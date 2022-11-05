const { User, sequelize, Student, Teacher } = require("../models");
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
        "role": "teacher",
        "saldo": 20000,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
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

const newTeacher = {
    "fullName": "zianurr",
    "bio": "kerennnnn",
    "image": "foto.img"
}

const students = [
    {
        "fullName": "Gio Septriadi",
        "image": "foto.img",
        "UserId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Teachers', teachers)
    await queryInterface.bulkInsert('Students', students)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Teachers', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Students', null, { truncate: true, restartIdentity: true, cascade: true })
})

let payloadTeacher = { id: 2 }
let validTokenTeacher = createToken(payloadTeacher)

let payloadStudent = { id: 1 }
let validTokenStudent = createToken(payloadStudent)

let payloadNewTeacher = { id: 3 }
let validTokenNewTeacher = createToken(payloadNewTeacher)

describe("show one teacher Test", () => {
    test("Success show one teacher", (done) => {
        request(app)
            .get("/teachers/detail")
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;

                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("fullName", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                expect(body).toHaveProperty("bio", expect.any(String));
                expect(body).toHaveProperty("image", expect.any(String));
                expect(body).toHaveProperty("averageRating", expect.any(String));
                return done();
            });
    });

    test("failed show one teacher, teacher not found", (done) => {
        request(app)
            .get("/teachers/detail")
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            });
    });

    test("failed show one teacher, invalid token", (done) => {
        request(app)
            .get("/teachers/detail")
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

describe("Post teacher Test", () => {
    test("Success post teacher", (done) => {
        request(app)
            .post("/teachers")
            .send(newTeacher)
            .set("access_token", validTokenNewTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("fullName", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                expect(body).toHaveProperty("bio", expect.any(String));
                expect(body).toHaveProperty("image", expect.any(String));
                expect(body).toHaveProperty("averageRating", expect.any(String));
                return done();
            });
    });

    test("failed post teacher, already created", (done) => {
        request(app)
            .post("/teachers")
            .send(newTeacher)
            .set("access_token", validTokenNewTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "You already made a profile");
                return done();
            });
    });

    test("failed post teacher, role is not teacher", (done) => {
        request(app)
            .post("/teachers")
            .send(newTeacher)
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "forbidden");
                return done();
            });
    });

});

describe("Edit teacher Test", () => {
    test("200 Success edit teacher", (done) => {
        request(app)
            .put("/teachers")
            .send({
                fullName: "edited",
                bio: "edited",
                image: "image.jpg"
            })
            .set("access_token", validTokenTeacher)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Teacher profile has been updated");
                return done();
            });
    });

    test("200 failed edit teacher, teacher not found", (done) => {
        request(app)
            .put("/teachers")
            .send(newTeacher)
            .set("access_token", validTokenStudent)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "error not found");
                return done();
            });
    });

});

