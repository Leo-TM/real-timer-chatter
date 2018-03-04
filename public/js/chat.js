 var socket = io();

function scrollToBottom ()
{
  //Selectors
  var room = jQuery("#room");
  var newMessage = room.children('li:last-child');
  //Heights
  var clientHeight = room.prop('clientHeight');
  var scrollHeight = room.prop('scrollHeight');
  var scrollTop = room.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
  {
    room.scrollTop(scrollHeight);
  }
}

socket.on("connect",function()
{
  var deparamed = jQuery.deparam(window.location.search);
  socket.emit("join",deparamed,function(err)
  {
    if(err)
    {
      alert(err);
      window.location.href = "/";
    }
    else
    {
      console.log("No Error");
    }
  }
  );

});
socket.on("disconnect",function ()
{
  console.log("Server disconnected");
});

socket.on("updateUsersList",function(userList)
{
  var ol = jQuery('<ol></ol>');
  userList.forEach(function(user)
  {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);

});


socket.on("newMessage",function(message)
{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var htmler = Mustache.render(template,{
    text:message.text,
    createdAt:formattedTime,
    from:message.from
  });

  jQuery('#room').append(htmler);
  scrollToBottom();
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // console.log("New message incomming",message);
  // var li = jQuery('<li></li>')
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#room').append(li);
});

socket.on('newLocationMessage',function(message)
{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var htmler = Mustache.render(template,
  {
    from:message.from,
    createdAt:formattedTime,
    url:message.url
  });
  jQuery('#room').append(htmler);
  scrollToBottom();





  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target=_blank>This is ma location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr("href",message.url);
  // li.append(a);
  // jQuery('#room').append(li);
});


jQuery('#message-form').on('submit',function(e)
{
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    text:messageTextbox.val()
  },function ()
  {
      messageTextbox.val("");
  });
});

var location_button = jQuery("#location-button");
location_button.on('click',function()
{
  if(!navigator.geolocation)
  {
    return alert("Browser does not support location");
  }

  location_button.attr('disabled','disabled');

  navigator.geolocation.getCurrentPosition(
    function(position){
      location_button.removeAttr('disabled').text('Send location');
      socket.emit("createLocationMessage",{
        lat:position.coords.latitude,
        lon:position.coords.longitude
      });
    },

    function(){
      location_button.removeAttr('disabled').text('Send location');
      alert("Can't fetch location");
    }

  );




});
