const {People} = require('./users');

const expect = require('expect');


describe('Users Class',()=>
{
  it('should add user',()=>
  {
    var people = new People();
    var user = {
      id : 1,
      name : 'leo',
      room : 'Noders'
    };
    var resUser = people.addUsers(user.id,user.name,user.room);
    expect(resUser).toEqual(user);
  }
  );
});
