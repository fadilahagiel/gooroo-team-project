// const app = require("../app");
// const request = require("supertest");
// const { User, Class, Transaction, Subject } = require("../models");
// const jwt = require('jsonwebtoken')

// let validToken, validToken2, invalidToken;
// const user1 = {
//     email: "user.test@mail.com",
//     username: "User Test",
//     password: "usertest",
// };


// afterAll(done => {
//     User.destroy({ truncate: true, cascade: true, restartIdentity: true })
//         .then(_ => {
//             return Class.destroy({ truncate: true, cascade: true, restartIdentity: true })
//         })
//         .then(_ => {
//             return Transaction.destroy({ truncate: true, cascade: true, restartIdentity: true })
//         })
//         .then(_ => {
//             return Subject.destroy({ truncate: true, cascade: true, restartIdentity: true })
//         })
//         .then(_ => {
//             done();
//         })
//         .catch(err => {
//             done(err);
//         });
// });

// beforeAll((done) => {
//     User.create(user1)
//         .then((registeredUser) => {
//             validToken = jwt.sign({
//                 id: registeredUser.id,
//                 email: registeredUser.email,
//             }, 'RAHASIA');
//             invalidToken =
//                 "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
//             return User.create(userTest2);
//         })
//         .then((registeredUser2) => {
//             validToken2 = jwt.sign({
//                 id: registeredUser2.id,
//                 email: registeredUser2.email,
//             }, 'RAHASIA');
//             return queryInterface.bulkInsert('Subjects',
//                 [
//                     {
//                         "name": "Matematika",
//                         "image": "foto.img",
//                         "createdAt": new Date(),
//                         "updatedAt": new Date()
//                     },
//                     {
//                         "name": "Bahasa Indonesia",
//                         "image": "foto.img",
//                         "createdAt": new Date(),
//                         "updatedAt": new Date()
//                     },
//                     {
//                         "name": "IPA",
//                         "image": "foto.img",
//                         "createdAt": new Date(),
//                         "updatedAt": new Date()
//                     }
//                 ],
//                 {}
//             );
//         })
//         .then(() => {
//             return queryInterface.bulkInsert('Classes',
//                 [
//                     {
//                         "TeacherId": 1,
//                         "name": "Matematich Class",
//                         "price": 20000,
//                         "quota": 5,
//                         "averageRating": 7.5,
//                         "status": "On Progress",
//                         "SubjectId": 1,
//                         "description": "kelas bagus",
//                         "url": "google.com",
//                         "createdAt": new Date(),
//                         "updatedAt": new Date()
//                     },
//                     {
//                         "TeacherId": 1,
//                         "name": "Matematich Class",
//                         "price": 20000,
//                         "quota": 5,
//                         "averageRating": 7.5,
//                         "status": "On Progress",
//                         "SubjectId": 3,
//                         "description": "kelas bagus",
//                         "url": "google.com",
//                         "createdAt": new Date(),
//                         "updatedAt": new Date()
//                     },
//                 ],
//                 {}
//             );
//         })
//         .then(() => {
//             done();
//         })
//         .catch((err) => {
//             done(err);
//         });
// });

// describe("GET /classes", () => {
//     test.only("200 success get classes", (done) => {
//         request(app)
//             .get("/classes")
//             .set("access_token", validToken)
//             .then((response) => {
//                 const { body, status } = response;

//                 expect(status).toBe(200);
//                 expect(Array.isArray(body)).toBeTruthy();
//                 expect(body.length).toBeGreaterThan(0);
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("401 get heroes with invalid token", (done) => {
//         request(app)
//             .get("/heroes")
//             .set("access_token", invalidToken)
//             .then((response) => {
//                 const { body, status } = response;

//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", "Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("401 get heroes without token", (done) => {
//         request(app)
//             .get("/heroes")
//             .then((response) => {
//                 const { body, status } = response;

//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", "Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });
// });
