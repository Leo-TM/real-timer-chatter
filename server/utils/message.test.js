const expect = require('expect');
const {getMessage,getLocationMessage} = require('./message');

describe('getMessage',()=>{
  it('should generate proper object ',()=>
  {
    var from = "harvey";
    var text = "I was not alone in this";

    var message = getMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });

});

describe('getLocationMessage',()=>
{
  it('should generate proper locations',()=>
  {
    var from = 'User007';
    var lat=1;
    var lon=2;

    var locationMessage = getLocationMessage(from,lat,lon);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.from).toBeA('string');
    expect(locationMessage.url).toEqual(`https://www.google.com/maps?q=${lat},${lon}`);
  });
});
