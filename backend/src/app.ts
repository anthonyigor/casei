import express from 'express'

import { AppDataSource } from './data-source'
import userRoutes from './routes/userRoutes'
import WebSocket from 'ws'
import cors from 'cors'
import { WhatsAppController } from './controllers/WhatsAppController'
import path from 'path'

const ACTIONS = {
    MESSAGE: 'new-message'
}

AppDataSource.initialize()
    .then(()=> {
        const app = express()
        app.use('/public', express.static('public'))
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

// const wppController = new WhatsAppController()
// const main = async() => {
//     const pathFile = path.resolve(__dirname, '..', 'public', 'uploads', 'file.pdf')
//     const media_id = await wppController.uploadPdfFile(pathFile)
//     await wppController.sendFile('5575981616102', media_id)
//     //await wppController.sendMessage('5575981616102', 'Olá, tudo bem?')
// }
// main()