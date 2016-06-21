'use strict';

//config/db.js - Database configuration


const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let dataPath = path.join(__dirname, '../data/data.db');

let db = new sqlite3.Database(dataPath);

module.exports = db;