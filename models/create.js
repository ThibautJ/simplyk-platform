var express = require('express');
var router = express.Router();
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/users';


function create(req, res) {

    var results = [];

    // Grab data from http request
    var data = {lname: req.session.lname, fname: req.session.fname, age: req.session.age, mail: req.session.mail,};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
      }

        // SQL Query > Insert Data
        client.query("INSERT INTO users(lname, fname, age, mail) values($1, $2, $3, $4)", [data.lname, data.fname, data.age, data.mail]);

        /* SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        console.log("start");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            console.log("done");
            done();
            return res.json(results);
        });*/


    });
};

exports.create = create;