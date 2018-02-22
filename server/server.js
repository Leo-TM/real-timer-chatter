const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const initialPath = path.join(__dirname,'..');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(initialPath + '/public'))

io.on('connection',(socket)=>
{
  console.log("new user connected");

  socket.on("createMessage",(message)=>
  {
    console.log("message from client ", message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
  });
  socket.on('disconnect',()=>
  {
    console.log(" user disconnected");
  });
});


server.listen(port,()=>
{
  console.log(`Server is up and running at ${port}`);
});
