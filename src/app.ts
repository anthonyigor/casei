import express from 'express'

import { AppDataSource } from './data-source'
import userRoutes from './routes/userRoutes'

AppDataSource.initialize()
    .then(()=> {
        const app = express()

        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        app.use('/users', userRoutes)

        return app.listen(5000, () => console.log("Server rodando"))
    })
    .catch((err) => console.log(err))
