const { } = require('dotenv/config')
const sequelize = require('./src/database/connection.js')



const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./src/api/routes/index.js')

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('/api', api)// Defining server port

const port = process.env.PORT || 8000

sequelize.sync({logging: false})
    .then((result) => {
        console.log("Connected")
        app.listen(port, () => {
            console.log(`Running on http://localhost:${port}`)
        })
    })
    .catch((err) => console.log(err))

