const mysql = require('mysql2/promise');
var migration = require('mysql-migrations');

// var connection = mysql.createConnection({

// });
// Create a connection pool
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: "touraxis",
  password: "TourAxis!",
  database: "touraxis",
  port: 3567, // Port to access MySQL server in Docker container
});

// // Test the connection
// connection.query('SELECT 1 + 1 as result')
//   .then(([rows]) => {
//     console.log('Connected to MySQL');
//     console.log('Result:', rows[0].result);
//   })
//   .catch(err => {
//     console.error('Error connecting to MySQL:', err);
//   });


function executeQuery(sql, callback) {
   connection.getConnection((err, connection) => {
      if (err) {
         return callback(err, null);
      } else {
         if (connection) {
            connection.query(sql, function (error, results, fields) {
               connection.release();
               if (error) {
                  return callback(error, null);
               }
               return callback(null, results);
            });
         }
      }
   });
}

function query(sql, callback) {
   executeQuery(sql, function (err, data) {
      if (err) {
         return callback(err);
      }
      callback(null, data);
   });
}

migration.init(connection, __dirname + '/database/migrations');

module.exports = {
   query: query,
   connection: connection
}