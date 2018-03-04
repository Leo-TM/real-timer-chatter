const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const initialPath = path.join(__dirname,'..');
const {isRealString} = require('./utils/validator');
const {getMessage,getLocationMessage} = require('./utils/message');
const {People} = require('./utils/users.js');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new People();


app.use(express.static(initialPath + '/public'))

io.on('connection',(socket)=>
{
  console.log("new user connected");


  socket.on("join",(deparamed,callback)=>
  {
    if(!isRealString(deparamed.name) || !isRealString(deparamed.room))
    {
      return callback("Name and room name is required");
    }

    socket.join(deparamed.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,deparamed.name,deparamed.room);
    io.to(deparamed.room).emit('updateUsersList',users.getUserList(deparamed.room));

    socket.emit('newMessage',getMessage('Admin',`Welcome ${deparamed.name}`));
    socket.broadcast.to(deparamed.room).emit('newMessage',getMessage('Admin',`${deparamed.name} has joined the room`));
    callback();
  });
  socket.on("createMessage",(message,callback)=>
  {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text))
    {
      io.to(user.room).emit('newMessage',getMessage(user.name,message.text));
    }

    callback();
  });
  socket.on('disconnect',()=>
  {
    var user = users.removeUser(socket.id);
    if(user)
    {
      io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',getMessage('Admin',`${user.name} has left the room`));
    }

  });


  socket.on('createLocationMessage',(coords)=>
  {
    var user = users.getUser(socket.id);
    if(user)
    {
      io.to(user.room).emit('newLocationMessage',getLocationMessage(user.name,coords.lat,coords.lon));
    }
  });

});


server.listen(port,()=>
{
  console.log(`Server is up and running at ${port}`);
});
