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
        this.users.push(user);
        return users;
    }

    GetUsersList(room) {
        var users = this.users.filter((user) =>  user.room === room);
        var namesArray = users.map((user) => {
            return users.name;
        });
        return namesArray;
    }
}

module.exports = {Users};