const User = require('./models/user')

class userDaoMongo {
    constructor(){
        this.model = User
    }

    async findUser (email) {
        return this.model.find({email})
    }

    async findUserbyName(username) {
        return this.model.find({username})
    }

    async createNewUser (newUser) {
        newUser = new this.model()        
        this.model.save()
    }

}

module.export = {
    userDaoMongo
}