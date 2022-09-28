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

//Review page

app.post("/api/addReview", (req, res) => {


	let connection = mysql.createConnection(config);
	let sql = "INSERT INTO Review (reviewTitle, reviewContent, reviewScore, user_id, movie_id) VALUES (?,?,?,?,?)";
	let data = [req.body.enteredTitle, req.body.enteredReview, req.body.selectedRating, req.body.userID, req.body.selectedMovie];
	
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.log("error")
			return console.error(error.message);
		}
		else{

		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		/*res.send("Values Inserted");*/
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

// Search page

app.post('/api/findMovie', (req, res) => {
	let connection = mysql.createConnection(config);
	let titleSearchTerm = req.body.titleSearchTerm;
	let actorSearchTerm = req.body.actorSearchTerm;
	let directorSearchTerm = req.body.directorSearchTerm;

	console.log("titleSearchTerm: ", titleSearchTerm);
	console.log("actorSearchTerm: ", actorSearchTerm);
	console.log("directorSearchTerm: ", directorSearchTerm);
	//SELECT distinct m.id, m.name, CONCAT(d.first_name,' ', d.last_name) AS director
	let sql = `SELECT distinct m.id
	FROM movies m, directors d, movies_directors md, actors a, roles ro
	WHERE m.id =md.movie_id
	and d.id = md.director_id
	and m.id = ro.movie_id
	and ro.actor_id = a.id`;
	
	let data = [];
	if (titleSearchTerm){
		sql = sql + ` AND m.name = (?)`;
		data.push(titleSearchTerm);
		console.log('data')

		console.log(data)
	}
	if (actorSearchTerm){
		sql = sql + ` AND CONCAT(a.first_name,' ', a.last_name) = (?)`;
		data.push(actorSearchTerm);
		console.log('data')

		console.log(data)

	}
	if (directorSearchTerm){
		sql = sql + ` AND CONCAT(d.first_name,' ', d.last_name) = (?)`;
		data.push(directorSearchTerm);
		console.log('data')
		console.log(data)
	}

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		console.log(results);
		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });

		console.log('--')
		console.log(string)

	});

	connection.end();

});

app.post("/api/getData", (req, res) => {

	let connection = mysql.createConnection(config);
	
	let ID = req.body.ID;
	console.log('ID', ID)

	let data = []
	let please = `SELECT distinct m.id, m.name, CONCAT(d.first_name,' ', d.last_name) AS director,
	case when exists (select 1
		from movies m, Review R
		WHERE R.movie_id = m.id
		and m.id= (?)
	) then (select avg(R.reviewScore)
		from movies m, Review R
		WHERE R.movie_id = m.id
		and m.id= (?)
	)
	else 'No review'
	end as scoring ,
	case when exists (select 1
		from movies m, Review R
		WHERE R.movie_id = m.id
		and m.id= (?)
	) then (select group_concat(R.reviewContent)
		from movies m, Review R
		WHERE R.movie_id = m.id
		and m.id= (?)
	)
	else 'No review'
	end as Reviews
		FROM movies m, directors d, movies_directors md, actors a, roles ro
		WHERE m.id =md.movie_id
		and d.id = md.director_id
		and m.id = ro.movie_id
		and ro.actor_id = a.id
		and m.id= (?) 
	
	group by m.id, CONCAT(d.first_name,' ', d.last_name)`

	data.push(ID,ID,ID,ID,ID);

	console.log(please);
	console.log(data);

	connection.query(please, data, (error, results, fields) => {
		if (error) {
			console.log("error")
			return console.error(error.message);
		}
		else{

		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		/*res.send("Values Inserted");*/
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6")
		console.log(string)
		}
		
		connection.end();

	});
});





//mypage
app.post('/api/getGenres', (req, res) => {
	
	let connection = mysql.createConnection(config);
	let sql = `select distinct MG.genre as genres from movies_genres MG`;
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

app.post("/api/getSameGenreMovies", (req, res) => {

	let connection = mysql.createConnection(config);
	
	let selectedGenre = req.body.selectedGenre;
	console.log('search', selectedGenre)

	let data = []
	let sql = `select M.name, M.year, CONCAT(D.first_name, ' ', D.last_name) as director 
	from movies M, movies_genres MG, movies_directors MD, directors D
	where M.id =MG.movie_id
    and M.id = MD.movie_id
    and MD.director_id = D.id
	AND MG.genre = (?)`;
	
	data.push(selectedGenre);

	
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.log("error")
			return console.error(error.message);
		}
		else{

		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		/*res.send("Values Inserted");*/
		console.log("success")
		console.log(string)
		}
		
		connection.end();

	});
});



app.post("/api/getURL", (req, res) => {

	let connection = mysql.createConnection(config);
	
	let mName = req.body.mName;
	console.log('searchMovieNme', mName)

	let sql = `select url.url from url, movies 
	where url.movie_id = movies.id
	and movies.name = (?)`

	let data = []

	data.push(mName);


	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.log("error")
			//res.send({ express: ''});
			return console.error(error.message);
		}
		else{ 
			console.log("herrrrrrrrrrrrrrrrr")

				console.log('');
				let string = JSON.stringify(results);

				let obj = JSON.parse(string);
				res.send({ express: string });
				/*res.send("Values Inserted");*/
				console.log("getURL")
				console.log(string)

				
				
		}
		
		connection.end();

	});
});

//app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
app.listen(port, '172.31.31.77');