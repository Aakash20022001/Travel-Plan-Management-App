const mysql = require('mysql2');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root@123',
  database: 'travel_plan_management_system1',
  waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
};

const pool = mysql.createPool(dbConfig);


module.exports = pool.promise();
