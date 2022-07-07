let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post("/api/addReview", (req, res) => {


	let connection = mysql.createConnection(config);
	let sql = "INSERT INTO Review (reviewID, reviewTitle, reviewContent, reviewScore, user_id, movie_id) VALUES (?,?,?,?,?,?)";
	let data = [req.body.reviewID, req.body.enteredTitle, req.body.enteredReview, req.body.selectedRating, req.body.userID, req.body.selectedMovie];
	
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.log("error")
			return console.error(error.message);
		}
		else{
		res.send("Values Inserted");
		console.log("success")
		}
		
		connection.end();

	});
});


app.post('/api/getMovies', (req, res) => {
	

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM movies`;
	let data = [];

	
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
