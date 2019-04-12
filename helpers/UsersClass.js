class Users {
    constructor() {
        this.users = [];
    }

    AddUserData(id, name, room) {
        var users = {
            id,
            name,
            room
        }
        this.users.push(users);
        return users;
    }

    GetUsersList(room) {
      var users = this.users.filter((user) => user.room === room);

      var namesArray = users.map((user) => {
          return user.name;
      });

      return namesArray;
    }

    GetUserRoom(id) {
        for(var i = 0; i < this.users.length; i++) {
            if(this.users[i].id === id){
                return this.users[i].room;
            }
        }
    }



    DropUser(id) {
        for(var i = 0; i < this.users.length; i++) {
            if(this.users[i].id === id){
                (this.users).splice(i, 1);
            }
        }
    }
}

module.exports = {Users};