class People
{
  constructor ()
  {
    this.users = [];
  }
  addUser(id,name,room)
  {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id)
  {
    var user = this.getUser(id);

    if(user)
    {
      this.users = this.users.filter((user)=>
      {
        return user.id !== id;
      }
      );
    }

    return user;
  }
  getUser(id)
  {
    return this.users.filter((user)=>user.id === id)[0];
  }
  getUserList(room)
  {
    var userFilter = this.users.filter((user)=>{
      return user.room === room;
    });
    var listOfPeopleInRoom = userFilter.map((user)=>{
      return user.name;
    });
    return listOfPeopleInRoom;
  }
}

module.exports = {People};
