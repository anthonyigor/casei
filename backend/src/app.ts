import express from 'express'

import { AppDataSource } from './data-source'
import userRoutes from './routes/userRoutes'
import WebSocket from 'ws'
import cors from 'cors'

const ACTIONS = {
    MESSAGE: 'new-message'
}

AppDataSource.initialize()
    .then(()=> {
        const app = express()
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        app.use(cors())
        app.use('/users', userRoutes)

        return app.listen(5000, () => console.log("Server rodando"))
    })
    .catch((err) => console.log(err))

// websocket config
const URL_WEBSOCKET = process.env.URL_WEBSOCKET as string;

console.log(URL_WEBSOCKET)
const client = new WebSocket(URL_WEBSOCKET, {
    headers: {
        'user-agent': 'Mozilla'
    }
})

client.on('open', () => {
    console.log("Conectado ao WebSocket")
})

client.on('error', (error) => {
    console.error('Erro na conexão:', error.message);
    // Handle the error appropriately, e.g., reconnect or log it
});

client.on('message', handleIncomingMessage.bind(null, client))

async function handleIncomingMessage(ws: WebSocket, msg: string) {
    const data = JSON.parse(msg)
    const action = data.action

    switch (action) {
        case ACTIONS.MESSAGE:
            console.log(data.msg)
    }
}
