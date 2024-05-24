import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let onlineUserList: any = {};

io.on("connection", (socket) => {
  console.log("connected", socket.id, socket.handshake.query.username);

  onlineUserList[`${socket.handshake.query.username}`] = socket.id;
  //  server emit online users to all connected client
  io.emit("onlineUserList", onlineUserList);

  // client's socket on message event
  socket.on("message", (data) => {
    console.log(data);

    // TODO: backup message data into database
    //

    // server relay data to receiver's socket
    io.to(onlineUserList[data.reciver]).emit("message", data);
  });

  // TODO: on client socket disconnect,remove records in onlineUserList
});

app.use(express.static("public"));

httpServer.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
