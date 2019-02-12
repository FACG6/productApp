const dbConnection = require('./../database/db_connection');

const getData = (tableName,cb)=>{
    dbConnection.query(`select * from ${tableName}`,(error,response)=>{
        if(error){
            cb(error);
        }else{
            cb(null,response.rows);
        }
    });
}
module.exports = getData;
