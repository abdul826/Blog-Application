import mysql from 'mysql';

export const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "blog"
});

// Check connection is stablished or not
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected To Database!");
  });