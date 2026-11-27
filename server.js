const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const router = require("./routes/routes");
const { Server } = require('socket.io');
const setupMessageSocket = require("./routes/sockets");

dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionMiddleware = session({
  secret: 'gfg-key',
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);
app.use("/", router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server);
setupMessageSocket(io, sessionMiddleware);
