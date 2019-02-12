const dbConnection = require('../database/db_connection.js');

const addProduct = (name, proDate, expDate, companyId, cb) => {
  dbConnection.query(
    'INSERT INTO product (name, pro_date, exp_date, company_id) VALUES ($1, $2, $3, $4)',
    [name, proDate, expDate, companyId],
    (err, res) => {
      if (err) return cb(err);
      return cb(null, res);
    },
  );
};

module.exports = addProduct;
