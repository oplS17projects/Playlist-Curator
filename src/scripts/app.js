/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var jf = require('jsonfile');
var fs = require('fs');

var client_id = '<client_id>'; // Your client id
var client_secret = '<client_secret>'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var spotifyApi = new SpotifyWebApi({
  clientId : client_id ,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});


var autho_code = null;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/views'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  autho_code = code; // save to work with spotify api

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };	

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

var playlistId;

app.get('/newList', function(req, res) {
	//console.log('Creating New List');
	//console.log(autho_code);

	spotifyApi.createPlaylist('ethanlgt', 'New!')
  .then(function(data) {

    playlistId = data.body['id']
    console.log(playlistId);

  });
	/*

	*/
    res.redirect('/')
});


app.get('/addSong', function(req, res) {

 var songArr = new Array();
 var authorArr = new Array();
 var idArr = new Array();
 var count = 0;
 var bestSong;



 console.log(playlistId)

  //opens file
  fs.readFile( '../music.json' ,"utf-8" ,function(err, obj) {

    try {
      obj = JSON.parse(obj);
    }
    catch(e) {
      console.log("Error With Parsing");
      return;
    }

    for(var k in obj){
      songArr[k] = obj[k].Song;
      authorArr[k] = obj[k].Author;
    }

    count = obj.length;
    var strArr = new Array();
    //main loop for search and adding
    for(var i = 0; i < count; i++) {
      strArr[i] = 'track:' + songArr[i] + ' ' + 'artist:' + authorArr[i];
      console.log(strArr[i]);
    
    //search array of tracks for
    spotifyApi.searchTracks(strArr[i])
      .then(function(data) {

      //find the most popular result and save it to variable
      console.log('Number of Found track', data.body.tracks.total);
      var firstPage = data.body.tracks.items;
      firstPage.forEach(function(track, index) {
          if(index === 0){
            bestSong = 'spotify:track:' + track.id;
            //idArr.push(bestSong);
          }
          console.log(index + ': ' + track.id + ' (' + track.popularity + ')');
      });

      //console.log(firstPage[0].track.id)
      }).then(function(data) {
       console.log(bestSong); 
       return spotifyApi.addTracksToPlaylist('ethanlgt', playlistId, bestSong);
    }).then(function(data) {
      console.log('Track is added');
    })
  }
  });

  res.redirect('/')
});

console.log('Listening on 8888');
app.listen(8888);