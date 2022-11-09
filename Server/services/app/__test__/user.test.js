const app = require("../app");
const request = require("supertest");
const { User, Class, Transaction, sequelize } = require("../models");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize
const user1 = {
    email: "user.test@mail.com",
    username: "User Test",
    password: "usertest",
    role: "teacher"
};

const users = [
    {
        "username": "ahmad",
        "email": "ahmad@mail.com",
        "password": "12345",
        "role": "student",
        "saldo": 100000,
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
]

let payloadA = { id: 1 }
let validToken = createToken(payloadA)


beforeAll(async () => {
    await queryInterface.bulkInsert('Users', users)
})
afterAll(done => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then(_ => {
            return Class.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return Transaction.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe("User Routes Test", () => {
    describe("POST /users/register - create new user", () => {
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

        test("400 Failed register - should return error if email is null", (done) => {
            request(app)
                .post("/users/register")
                .send({
                    password: "qweqwe",
                    username: "name"
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Please input email");
                    return done();
                });
        });

        test("400 Failed register - should return error if email is already exists", (done) => {
            request(app)
                .post("/users/register")
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email already exist");
                    return done();
                });
        });

        test("400 Failed register - should return error if wrong email format", (done) => {
            request(app)
                .post("/users/register")
                .send({
                    email: "random",
                    username: "Sample User",
                    password: "qweqwe",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email must be in email format");
                    return done();
                });
        });

        test("400 Failed register - should return error if password is null", (done) => {
            request(app)
                .post("/users/register")
                .send({
                    email: "random",
                    username: "Sample User",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Please input password");
                    return done();
                });
        });

        test("400 Failed register - should return error if password is null", (done) => {
            request(app)
                .post("/users/register")
                .send({
                    email: "random",
                    password: "123456",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Please input username");
                    return done();
                });
        });
    });

    describe("POST /users/login - user login", () => {
        test("200 Success login - should return access_token", (done) => {
            request(app)
                .post("/users/login")
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(200);
                    expect(body).toHaveProperty("access_token", expect.any(String));
                    return done();
                });
        });

        test("401 Failed login - should return error if password is incorrect", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    email: "hello@mail.com",
                    password: "salahpassword",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "invalid email/password");
                    return done();
                });
        });

        test("401 Failed login - should return error if password is null", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    email: "hello@mail.com",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "invalid email/password");
                    return done();
                });
        });

        test("401 Failed login - should return error if email is null", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    password: "ini bener"
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "invalid email/password");
                    return done();
                });
        });
    });

    describe("POST /users/topup - return url transaction", () => {
        test("200 Success return url transaction", (done) => {
            request(app)
                .post("/users/topup")
                .set("access_token", validToken)
                .send({
                    price: 100000
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(200);
                    expect(body).toHaveProperty("transaction", expect.any(Object));
                    return done();
                });
        });

    });

    describe("PATCH /users/saldo - increment user's saldo", () => {
        test("200 Success top up saldo", (done) => {
            request(app)
                .patch("/users/saldo")
                .set("access_token", validToken)
                .send({
                    saldo: 100000
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(200);
                    expect(body).toHaveProperty("message", expect.any(String));
                    return done();
                });
        });

    });

    describe("GET /users - find one user login", () => {
        test("200 Success find one user login", (done) => {
            request(app)
                .get("/users")
                .set("access_token", validToken)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("username", expect.any(String));
                    expect(body).toHaveProperty("email", expect.any(String));
                    expect(body).toHaveProperty("role", expect.any(String));
                    expect(body).toHaveProperty("saldo", expect.any(Number));
                    return done();
                });
        });

    });

    describe("GET /users - find one user by id", () => {
        test("200 Success find one user login", (done) => {
            request(app)
                .get("/users/1")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("username", expect.any(String));
                    expect(body).toHaveProperty("email", expect.any(String));
                    expect(body).toHaveProperty("role", expect.any(String));
                    expect(body).toHaveProperty("saldo", expect.any(Number));
                    return done();
                });
        });

    });
});

