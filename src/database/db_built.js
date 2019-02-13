const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sqlFilePath = path.join(__dirname, 'db_built.sql');
const sql = fs.readFileSync(sqlFilePath).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log('tables are created', res);
});
