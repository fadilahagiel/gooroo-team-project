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

describe("Detail Teacher Test", () => {
    describe("GET /teachers/detail - create new user", () => {
        test("201 Success register - should create new User", (done) => {
            request(app)
                .post("/users/register")
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(201);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("email", user1.email);
                    return done();
                });
        });

        // test("400 Failed register - should return error if email is null", (done) => {
        //     request(app)
        //         .post("/users/register")
        //         .send({
        //             password: "qweqwe",
        //             username: "name"
        //         })
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             const { body, status } = res;

        //             expect(status).toBe(400);
        //             expect(body).toHaveProperty("message", "please input email");
        //             return done();
        //         });
        // });

        // test("400 Failed register - should return error if email is already exists", (done) => {
        //     request(app)
        //         .post("/users/register")
        //         .send(user1)
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             const { body, status } = res;

        //             expect(status).toBe(400);
        //             expect(body).toHaveProperty("message", "email alrady exist");
        //             return done();
        //         });
        // });

        // test("400 Failed register - should return error if wrong email format", (done) => {
        //     request(app)
        //         .post("/users/register")
        //         .send({
        //             email: "random",
        //             username: "Sample User",
        //             password: "qweqwe",
        //         })
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             const { body, status } = res;

        //             expect(status).toBe(400);
        //             expect(body).toHaveProperty("message", "must be email format");
        //             return done();
        //         });
        // });

        // test("400 Failed register - should return error if password is null", (done) => {
        //     request(app)
        //         .post("/users/register")
        //         .send({
        //             email: "random",
        //             username: "Sample User",
        //         })
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             const { body, status } = res;

        //             expect(status).toBe(400);
        //             expect(body).toHaveProperty("message", "please input password");
        //             return done();
        //         });
        // });

        // test("400 Failed register - should return error if password is null", (done) => {
        //     request(app)
        //         .post("/users/register")
        //         .send({
        //             email: "random",
        //             password: "123456",
        //         })
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             const { body, status } = res;

        //             expect(status).toBe(400);
        //             expect(body).toHaveProperty("message", "please input username");
        //             return done();
        //         });
        // });
    });


});
