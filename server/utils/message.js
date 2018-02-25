const moment = require('moment');

var getMessage = (from,text) =>
{
  return {
    from,
    text,
    createdAt:moment().valueOf()
  }
}


var getLocationMessage = (from,lat,lon)=>
{
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt:moment().valueOf()
  };

}

module.exports = {getMessage,getLocationMessage};
