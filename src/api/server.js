const express = require('express') 

const cors = require('cors') 
const bodyParser = require('body-parser') 
const api = require('./routes') 

const app = express()

const runServer = () => {
    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(cors())

    app.use('/api', api)// Defining server port

    const port = process.env.PORT || 8000

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`)
    })
}

module.exports = runServer