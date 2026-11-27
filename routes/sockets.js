const { PushChatMessage } = require("../controllers/pageController");

function setupMessageSocket(io, sessionMiddleware) {
  io.engine.use(sessionMiddleware);

  const messagesNs = io.of("/api/messages");

  messagesNs.on("connection", (socket) => {
    console.log("CONNECTED! Socket ID:", socket.id, "Session:", socket.request.session);

    socket.on("send_message", (data) => {
      console.log("MESSAGE RECEIVED:", data);
      PushChatMessage(io, socket, data);
    });
  });
}


module.exports = setupMessageSocket;
