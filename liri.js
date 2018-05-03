var fs = require('fs');
var moment = require('moment');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// keys for both Twitter and Spotify
var keys = require('./keys.js');

var userInput = process.argv;
var command = userInput[2];
var searchString = "";

// converts input after command into a string for searches
if (command === 'spotify-this-song') {
	searchString = userInput.slice(3, userInput.length).join(" ");
}
else if (command === 'movie-this') {
	searchString = userInput.slice(3, userInput.length).join("+");
}

// handles function calls based on command input
function doCommands(command, string) {
	switch (command) {
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThisSong(string);
			break;
		case 'movie-this':
			movieThis(string);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
			console.log(`That is not a valid command.`);
	};
}

doCommands(command, searchString);
logCommand(command, searchString);

// displays tweets and timestamps
function myTweets() {
	var twitterKeys = new Twitter({
	  consumer_key: keys.twitter.consumer_key,
	  consumer_secret: keys.twitter.consumer_secret,
	  access_token_key: keys.twitter.access_token_key,
	  access_token_secret: keys.twitter.access_token_secret
	});
	var params = {screen_name: 'imaginarysee', count: 20};
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log(`Tweets from ${params.screen_name}\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`);
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log(`Time Tweeted: ${moment(tweets[i].created_at, "ddd MMM DD HH:mm:ss Z YYYY").utc(-6).format("DD MMMM YYYY, h:mma")}`);
	  		console.log(`    ${tweets[i].text}`);
	  		console.log(`----------------------------------\n`);
	  	}
	  }
	});
}

// displays song information
function spotifyThisSong(string) {
	if (string === "") { string = "Nythod Cacwn"; }
	var spotify = new Spotify({
	  id: keys.spotify.id,
	  secret: keys.spotify.secret
	});
	spotify.search({ type: 'track', query: string, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log(`Error occurred: ${err}`);
	  }
	  var song = data.tracks.items[0];
	  var artistObject = song.artists;
	  var artists = "";
	  for (var i = 0; i < artistObject.length; i++) {
	  	artists += artistObject[i].name;
	  	if (i === (artistObject.length - 1)) {
				break;
			}
			else {
				artists += ", ";
			}
	  }
		console.log(`Artist(s): ${artists}`);
		console.log(`Song: ${song.name}`);
		console.log(`Preview link: ${song.preview_url}`);
		console.log(`Album: ${song.album.name}`);
	});
}

// displays movie information
function movieThis(string) {
	if (string === "") { string = "Dr. Strangelove"; }
	// OMDB API URL variable
	var queryUrl = `http://www.omdbapi.com/?t=${string}&y=&plot=short&apikey=trilogy`;
	// makes request to OMDB API
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
	    console.log(`${JSON.parse(body).Title}\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
	    console.log(`Released: ${JSON.parse(body).Released}`);
	    console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
	    console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
	    console.log(`Country: ${JSON.parse(body).Country}`);
	    console.log(`Language: ${JSON.parse(body).Language}`);
	    console.log(`Plot: ${JSON.parse(body).Plot}`);
	    console.log(`Actors: ${JSON.parse(body).Actors}`);
	  }
});
}

// runs command based on contexts of random.txt
function doWhatItSays() {
	fs.readFile("random.txt", "utf-8" , function(err,data) {
		if (err) {
			return console.log(err);
		}
		var textArr = data.split(',"');
		var fileString = textArr[1];
		fileString = fileString.slice(0, -1);
		doCommands(textArr[0], fileString);
	});
}

// creates a logfile of commands run
function logCommand(command, string) {
	fs.appendFile("log.txt", `Command: ${command}, Search string: ${string}\n`, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}