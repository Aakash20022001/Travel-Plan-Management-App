const mysql = require('mysql2');

const dbConfig = {
  host: 'database-1.cmihmejle7vq.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'root1234',
  database: 'travel_plan_management_system1',
  waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
};

const pool = mysql.createPool(dbConfig);


module.exports = pool.promise();
