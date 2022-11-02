const express = require('express')
const errorHandlers = require('./middlewares/errorHandlers')
const router = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

app.use(errorHandlers)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})