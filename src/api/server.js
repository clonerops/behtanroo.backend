import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import api from './routes';

const app = express()

export const runServer = () => {
    app.set('trust proxy', 1);
    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(cors())

    app.use('/api', api)// Defining server port

    const port = process.env.PORT || 8000

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`)
    })
}

