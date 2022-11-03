const { Class, Transaction, Student, Teacher } = require('../models')
const { google } = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    "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",
    'http://localhost:4000' 
)

oauth2Client.setCredentials({refresh_token})

class Controller {

    static async createToken(req, res, next) {
        try {
            const { code } = req.body
            const response = await oauth2Client.getToken(code)
            res.send(response)
        } catch (error) {
            next(error)
        }
    } 

    static async postSchedule(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller