// be sure to require socket.io
const createServer = require("http").createServer;
const express = require("express");
const app = express();

const httpServer = createServer(app);

const Server = require("socket.io").Server;

// after we start listening to our server, we can set up and attach our socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// in a separate file we'll get more specific about the events we want our socket server to listen for and broadcast
// require("./my-app/src/socket")(io);


io.on("connection", (socket) => {
  console.log("hello this is server");
  socket.on("object-added", (data) => {
    socket.broadcast.emit("new-add", data);
  });
  
  socket.on("object-modified", (data) => {
    socket.broadcast.emit("new-modification", data);
  });
});

io.listen(8080);