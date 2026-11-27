const { PushChatMessage } = require("../controllers/pageController");

function setupMessageSocket(io, sessionMiddleware) {
  // 1. Share Express session on the main `io` engine
  io.engine.use(sessionMiddleware);

  const messagesNs = io.of("/api/messages");

  // 2. Check that the user is logged in
  messagesNs.use((socket, next) => {
    if (socket.request.session && socket.request.session.user) {
      return next();
    }
    return next(new Error("Not logged in"));
  });

  // 3. Handle incoming chat messages
  messagesNs.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      PushChatMessage(io, socket, data);
    });
  });
}

module.exports = setupMessageSocket;
