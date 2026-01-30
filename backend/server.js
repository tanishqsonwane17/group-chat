const dotenv = require('dotenv').config();
const connectToDb = require('./src/db/db');
connectToDb();
const cors = require('cors')

const express = require('express');
const app = express();
const chatSocket = require('./src/sockets/socket');
const { createServer } = require('http');
const { Server } = require('socket.io');
const roomRoutes = require('./src/routes/room.routes');
app.use(cors())
app.use(express.json());
app.use('/room', roomRoutes);

let expServer = createServer(app);

let io = new Server(expServer,{
  cors:{
    origin:'*'
  }
});

chatSocket(io);

expServer.listen(3000, () => {
  console.log('server is listening in port', 3000);
});
