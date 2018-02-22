const expect = require('expect');
const {getMessage} = require('./message');

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
