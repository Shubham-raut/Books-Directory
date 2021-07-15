const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'books-directory',
  password: 'mysqlpassword',
});

module.exports = pool.promise();
