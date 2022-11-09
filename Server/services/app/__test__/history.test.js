const app = require("../app");
const request = require("supertest");
const { User, Class, Transaction, sequelize, Student } = require("../models");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const users = [
    {
        username: "ahmad",
        email: "ahmad@mail.com",
        password: "12345",
        role: "student",
        saldo: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "budi",
        email: "budi@mail.com",
        password: "12345",
        role: "teacher",
        saldo: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const students = [
    {
        fullName: "Gio Septriadi",
        image: "foto.img",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

let payloadA = { id: 1 };
let validToken = createToken(payloadA);

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", users);
    await queryInterface.bulkInsert("Students", students);
});
afterAll((done) => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then((_) => {
            return Class.destroy({
                truncate: true,
                cascade: true,
                restartIdentity: true,
            });
        })
        .then((_) => {
            return Student.destroy({
                truncate: true,
                cascade: true,
                restartIdentity: true,
            });
        })
        .then((_) => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe("GET histories test ", () => {
    test("200 success GET histories", (done) => {
        request(app)
            .get(`/histories`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});