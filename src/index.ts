import express from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// const io = new Server(3000, {
//   cors: {
//     origin: "*",
//   },
// });
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/view.html"));
});

io.on("connection", (socket) => {
  console.log(socket.id + " Connected");
  socket.on("disconnect", () => {
    console.log(socket.id + " Disconnected");
  });
  socket.on("pulseRate", (rate) => {
    if (rate > 100) {
      console.log("Pulse rate is too high at " + rate + " bpm");
    } else if (rate < 60) {
      console.log("Pulse rate is too low at " + rate + " bpm");
    } else {
      console.log("Pulse: " + rate + " bpm");
    }
    io.emit("pulseRate", rate);
  });
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
