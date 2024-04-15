const express = require("express")
const nedb = require("nedb-promise")

const db = new nedb({filename: "database.db", autoload: true})

module.exports = db