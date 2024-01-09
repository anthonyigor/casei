import express from 'express'

import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(()=> {
        const app = express()

        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        
        app.get('/', (req, res): any => res.send("Hello World"))

        return app.listen(5000, () => console.log("Server rodando"))
    })
    .catch((err) => console.log(err))
