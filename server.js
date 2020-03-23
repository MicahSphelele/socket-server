const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT ||  3000;

  server.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`);
 });
 
app.get('/', (req, res)=>{
  res.send("Hello Socket Server");
});

let array = [];

io.on("connection", (socket)=>{

    console.log("Socket connected = " + socket.handshake.address);


    socket.on('connect user', function(user){
        console.log("Connected user " + JSON.stringify(user));
        io.emit('connect user', user);
      });
    
      socket.on('on typing', function(typing){
        console.log("Typing.... ");
        io.emit('on typing', typing);
      });
    
      socket.on('chat message', function(msg){
        console.log("Message " + msg['message']);
        io.emit('chat message', msg);
      })

      socket.on('disconnect', ()=>{
        console.log("Socket disconnected = " + socket.handshake.address);
      });
    
});