const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const initialPath = path.join(__dirname,'..');
const {getMessage,getLocationMessage} = require('./utils/message');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(initialPath + '/public'))

io.on('connection',(socket)=>
{
  console.log("new user connected");

  socket.emit('newMessage',getMessage('admin','Wellcome user'));
  socket.broadcast.emit('newMessage',getMessage('admin','new user joined'));

  socket.on("createMessage",(message,callback)=>
  {
    console.log("message from client ", message);
    io.emit('newMessage',getMessage(message.from,message.text));
    callback();
  });
  socket.on('disconnect',()=>
  {
    console.log(" user disconnected");
  });
  socket.on('createLocationMessage',(coords)=>
  {
    io.emit('newLocationMessage',getLocationMessage('Admin',coords.lat,coords.lon));
  });

});


server.listen(port,()=>
{
  console.log(`Server is up and running at ${port}`);
});
