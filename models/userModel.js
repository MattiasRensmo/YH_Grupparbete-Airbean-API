const Datastore = require('nedb-promise')
const db = new Datastore({ filename: './database/database.db', autoload: true })

const bcrypt = require('bcrypt')

class User {

  static async createUser(username, password) { 
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = { // schema
      type: 'user',
      username: username,
      password: hashedPassword
    }

    return db.insert(user)
  }


  static findUserByUsername(username) { 
    return db.findOne({ type: 'user', username })
  }

}

module.exports = User


