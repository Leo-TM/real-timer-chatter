var socket = io();
socket.on("connect",function()
{
  console.log("connected to server");
  socket.emit("createMessage",{
    to:'lionel@spain.com',
    text:'its fine'
  });
});
socket.on("disconnect",function ()
{
  console.log("Server disconnected");
});

socket.on("newMessage",function(message)
{
  console.log("New message incomming",message);
});
