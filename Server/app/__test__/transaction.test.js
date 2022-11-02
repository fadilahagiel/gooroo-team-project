const { sequelize } = require('../models')
const { queryInterface } = sequelize
const request = require('supertest')
const app = require('../app')
const { describe } = require('node:test')

//! enter class

describe('POST /transactions', () => {
    test(`POST /transactions/:classId - success `)
})