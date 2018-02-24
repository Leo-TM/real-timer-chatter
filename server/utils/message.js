

var getMessage = (from,text) =>
{
  return {
    from,
    text,
    createdAt:new Date().getTime()
  }
}


var getLocationMessage = (from,lat,lon)=>
{
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt:new Date().getTime()
  };

}

module.exports = {getMessage,getLocationMessage};
