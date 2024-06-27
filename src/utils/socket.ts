import { io } from "socket.io-client";

const socket = io("https://back-end-j1bi.onrender.com");

socket.on("connect", () => {
  console.log("connected to server");
});

export default socket;
