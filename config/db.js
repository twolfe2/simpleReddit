'use strict';

//config/db.js - Database configuration

const mysql = require('mysql');







let db = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD, //$ export MYSQL_PASSWORD = 'my_password'
  database: 'test'
});

db.connect();


// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// let dataPath = path.join(__dirname, '../data/data.db');

// let db = new sqlite3.Database(dataPath);

module.exports = db;