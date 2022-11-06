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
    {
        "TeacherId": 1,
        "name": "Science Class",
        "price": 20000,
        "quota": 5,
        "averageRating": 7.5,
        "status": "On Progress",
        "SubjectId": 2,
        "description": "kelas bagus",
        "url": "google.com",
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
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
    {
        "name": "IPA",
        "image": "foto.img",
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
]

const wishlists = [
    {
        "StudentId": 1,
        "ClassId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
] 

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
    await queryInterface.bulkInsert('Teachers', teachers)
    await queryInterface.bulkInsert('Students', students)
    await queryInterface.bulkInsert('Subjects', subjects)
    await queryInterface.bulkInsert('Classes', classes)
    await queryInterface.bulkInsert('Schedules', schedules)
    await queryInterface.bulkInsert('Wishlists', wishlists)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Wishlists', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Teachers', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Students', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Subjects', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Schedules', null, { truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Classes', null, { truncate: true, restartIdentity: true, cascade: true })
})

let payloadTeacher = { id: 2 }
let validTokenTeacher = createToken(payloadTeacher)
let payloadStudent = { id: 1 }
let validTokenStudent = createToken(payloadStudent)

describe("POST wishlist test /wishlists/:ClassId", () => {
    test("201 success POST wishlists", (done) => {
        request(app)
            .post(`/wishlists/2`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed POST wishlists, already add wishlist", (done) => {
        request(app)
            .post(`/wishlists/2`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("failed POST wishlists, class not found", (done) => {
        request(app)
            .post(`/wishlists/22`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed POST wishlists, role is not student", (done) => {
        request(app)
            .post(`/wishlists/2`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("GET wishlist test /wishlists", () => {
    test("201 success GET wishlists", (done) => {
        request(app)
            .get(`/wishlists`)
            .set("access_token", validTokenStudent)
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

    test("201 failed GET wishlists, invalid token", (done) => {
        request(app)
            .get(`/wishlists`)
            .set("access_token", "salah")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "invalid_token");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("failed GET wishlists, role is not student", (done) => {
        request(app)
            .get(`/wishlists`)
            .set("access_token", validTokenTeacher)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("DELETE wishlist test /wishlists/:WishlistId", () => {
    test("200 success delete wishlists", (done) => {
        request(app)
            .delete(`/wishlists/1`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Success delete wishlist");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("failed delete wishlists, wishlist not found", (done) => {
        request(app)
            .delete(`/wishlists/99`)
            .set("access_token", validTokenStudent)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Wishlist not found");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("failed DELETE wishlists, role is not student", (done) => {
        request(app)
            .delete(`/wishlists/2`)
            .set("access_token", validTokenTeacher)
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