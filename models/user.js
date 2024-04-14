// representerar datastrukturen och DATABASINTERAKTIONEN

const db = require('../db/db');
const bcrypt = require('bcrypt');

class User {

  static async createUser(username, password) { // logik för att SKAPA ett konto
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.insert({ type: 'user', username, password: hashedPassword });
  }


  static findUserByUsername(username) { // logik för att HITTA en användare baserat på användarnamnet
    return db.findOne({ type: 'user', username });
  }

}

module.exports = User;


// createUser och findUserByUsername blir nu alltså specifika till vår "mall" User. Denna User och VÅRA SKAPADE FUNKTIONER (createUser och findUserByUsername) kommer ju att användas i vår kontroller sen