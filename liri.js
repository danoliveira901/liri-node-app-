require("dotenv").config();

var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];
//consol.log("userOption + inputParameter")

UserInputs(userOption, inputParameter);
//function for seach using switch
function UserInputs(userOption, inputParameter) {
  switch (userOption) {
    case "concert-this":
      showConcertInfo(inputParameter);
      break;
    case "spotify-this-song":
      showSongsInfo(inputParameter);
      break;
    case "movie-this":
      showMovieInfo(inputParameter);
      break;
    case "do-what-it-says":
      showSomeInfo(inputParameter);
      break;
  }
}

//spotfy function
function showSongsInfo(inputParameter) {
  //var search
  if (inputParameter === undefined) {
    // default songs
    inputParameter = "Imagine Dragons - Birds";
  }
  spotify.search(
    {
      type: "track",
      limit: 1,
      query: inputParameter
    },
    function(err, data) {
      if (err) {
        console.log("Error orrurred:" + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log("*****************************");

        console.log("SONG INFO");

        console.log("Song name: " + songs[i].name);

        console.log("Preview song: " + songs[i].preview_url);

        console.log("Album: " + songs[i].album.name);

        console.log("Artist(s): " + songs[i].artists[0].name);

        console.log("*****************************");
      }
    }
  );
}
// bands in town
function showConcertInfo(inputParameter) {
  if (inputParameter === undefined) {
    // default songs
    inputParameter = "Imagine Dragons - Birds";
  }

  axios
    //still havent fig

    .get(
      `https://rest.bandsintown.com/artists/${inputParameter}/events?app_id=codingbootcamp`
    )

    .then(function(response, err) {
      if (err) {
        console.log("Error orrurred:" + err);
        return;
      }
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        var date = moment(data[i].datetime).calendar();

        console.log(/--------------------------/);

        console.log("Venue Name: ", data[i].venue.name);
        console.log(
          "Venue Location: ",
          data[i].venue.city + " " + data[i].venue.region
        );
        console.log("Date: ", date);
        console.log(/--------------------------/);
      }
    });
}
// movie
function showMovieInfo(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "Mr. Nobody";

    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );

    console.log("It's on Netflix!");
  }

  axios
    .get(
      `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_ID}&t=${inputParameter}`
    )

    .then(function(response, err) {
      if (err) {
        console.log("Error orrurred:" + err);
        return;
      }
      console.log("+++++++++++++++++++++++++++++++++");

      console.log("Title of the movie: ", response.data.Title);
      console.log("Year the movie came out: ", response.data.Year);
      console.log("IMDB Rating of the movie: ", response.data.Ratings[0].Value);
      console.log(
        "Rotten Tomatoes Rating of the movie: ",
        response.data.Ratings[1].Value
      );
      console.log(
        "Country where the movie was produced: ",
        response.data.Country
      );
      console.log("Language of the movie: ", response.data.Language);
      console.log("Plot of the movie: ", response.data.Plot);
      console.log("Actors in the movie: ", response.data.Actors);
      console.log("+++++++++++++++++++++++++++++++++");
    });
}

function showSomeInfo() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(",");
    UserInputs(dataArr[0], dataArr[1]);
  });
}
