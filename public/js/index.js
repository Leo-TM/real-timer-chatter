var socket = io();
socket.on("connect",function()
{
  console.log("connected to server");

});
socket.on("disconnect",function ()
{
  console.log("Server disconnected");
});

socket.on("newMessage",function(message)
{
  console.log("New message incomming",message);
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`);

  jQuery('#room').append(li);

});

socket.on('newLocationMessage',function(message)
{
  var li = jQuery('<li></li>');
  var a = jQuery('<a target=_blank>This is ma location</a>');
  li.text(`${message.from}: `);
  a.attr("href",message.url);
  li.append(a);
  jQuery('#room').append(li);
});


jQuery('#message-form').on('submit',function(e)
{
  e.preventDefault();

  socket.emit('createMessage',{
    from:"User",
    text:jQuery("[name=message]").val()
  },function ()
  {

  });
});

var location_button = jQuery("#location-button");
location_button.on('click',function()
{
  if(!navigator.geolocation)
  {
    return alert("Browser does not support location");
  }

  navigator.geolocation.getCurrentPosition(
    function(position){
      socket.emit("createLocationMessage",{
        lat:position.coords.latitude,
        lon:position.coords.longitude
      });
    },

    function(){
      alert("Can't fetch location");
    }

  );




});
