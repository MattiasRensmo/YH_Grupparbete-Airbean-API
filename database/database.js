//TODO ska vi använda denna till nått?

// const express = require('express')
const Datastore = require('nedb-promise')

const db = new Datastore({
  filename: './database/database.db',
  autoload: true,
})

module.exports = db
