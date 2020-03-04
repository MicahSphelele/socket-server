const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000 | process.env.PORT;

app.get('/', (req, res)=>{
    //res.sendFile(__dirname + '/index.html');
    res.send("Hello Socket Server")
});


  server.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
 });

io.on("connection", (socket)=>{
    
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
      });
    
});