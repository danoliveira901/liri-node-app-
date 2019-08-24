require("dotenv").config();

var request = require("request");
var fs = require("fs");
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
      showMovieInfo();
      break;
    case "do-what-it-says":
      showSomeInfo();
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
