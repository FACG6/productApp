const dbConnection = require('./../database/db_connection');

const getData = (tableName, cb) => {
  let query = `select * from ${tableName} order by id DESC`;
  if (tableName === 'product') {
    query = 'select product.name,product.pro_date,product.exp_date,company.name as com_name from company join product ON product.company_id= company.id order by product.id DESC';
  }
  dbConnection.query(query, (error, response) => {
    if (error) {
      cb(error);
    } else {
      cb(null, response.rows);
    }
  });
};
module.exports = getData;
