const dotenv = require('dotenv').config()
const connectToDb = require('./src/db/db')
const roomRoutes = require('./src/routes/room.routes')
connectToDb()
const  express = require('express');
const app = express()
const chatSoccket =  require('./src/sockets/socket')
const {createServer} = require('http')
app.use(express.json())
const {Server} = require('socket.io')

app.use('/room',roomRoutes)



let expServer = createServer(app) 
let io = new Server(expServer)

chatSoccket(io)

expServer.listen(3000,()=>{
    console.log('server is listening in port', 3000)
})


