# Liri Node App
This is a command-line app written in Node.js, which can be used to look up tweets and other media. Liri stands for "*L*anguage *I*nterpretation and *R*ecognition *I*nterface". APIs used include Twitter, Spotify, and OMDB.

## Commands
* Look up user's tweets:
    node liri.js my-tweets
    ![Liri Node App - Tweets](/screencaps/liri-node-app-tweets.gif?raw=true)
* Find a song in Spotify:
    node liri.js spotify-this-song [insert song name here]
    ![Liri Node App - Spotify](/screencaps/liri-node-app-spotify.gif?raw=true)
    default if string blank:
    ![Liri Node App - Spotify (default)](/screencaps/liri-node-app-spotify-default.gif?raw=true)
* Find information about a movie:
    node liri.js movie-this [insert movie name here]
    ![Liri Node App - IMDB](/screencaps/liri-node-app-imdb.gif?raw=true)
    default if string blank:
    ![Liri Node App - IMDB (default)](/screencaps/liri-node-app-imdb-default.gif?raw=true)
* Run a command from a text file:
    node liri.js do-what-it-says
    ![Liri Node App - File](/screencaps/liri-node-app-file.gif?raw=true)
