import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let onlineUserList: any = {
  fake: 1234,
};

io.on("connection", (socket) => {
  console.log("connected", socket.id, socket.handshake.query.username);
  onlineUserList[`${socket.handshake.query.username}`] = socket.id;
  socket.emit("onlineUserList", onlineUserList);
});

app.use(express.static("public"));

httpServer.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
