var expect = require('expect');
var {isRealString} = require('./validator');


describe("validator",()=>
{
  it('should reject non-string values',()=>
  {
    var res = isRealString(985);
    expect(res).toBe(false);
  });

  it('should reject spaces',()=>
  {
    var res = isRealString('           ');
    expect(res).toBe(false);
  });
  it('should accept characters with empty spaces',()=>
  {
    var res= isRealString('   sdfsdf  dfd       ');
    expect(res).toBe(true);
  });
}
);
