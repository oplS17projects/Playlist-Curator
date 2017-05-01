# Playlist Curator

## Ethan Cumming
### April 30, 2017

# Overview
This application uses Racket and NodeJS to curate a playlist on Spotify from a .csv file.

The Racket portion of the code converts the .csv into a JSON file. The Node JS server is then launched on the machine's localhost and handles user authentication to the spotify API. After login, the user creates and adds music to the playlist from the JSON file.

The Racket and NodeJS code both heavily utilize the concept of data abstraction and  object orientation. In racket hashes are used to abstract data to form JSON expressions. On the server side, object orientation is required to stream json file into an object variable and parse the data.

**Authorship note:** The code in this project was written by me and my partner (Christian) or is an edited version of Spotify Web API Tutorial. LINK: https://developer.spotify.com/web-api/tutorial/#disqus_thread

# Libraries Used

The Racket Libraries used are 
```
(require csv-reading)
(require json)
```

* The ```csv-reading``` library can interpret a .csv file in a local directory and has the ability to transform the data.
* The ```json``` library uses hashes to form jsexpr that can then be written to a file.

The Node Libraries used are:
```
require('express');
require('request');
require('querystring');
require('cookie-parser');
require('spotify-web-api-node');
```

* The ```express``` library is a web framework that simplifies NodeJS and helps to start a web app.
* The ```request``` library allow to send RESTful requests to a server.
* The ```querystring``` library allows to format URL strings needed for authentication purposes
* The ```cookie-parser``` library allows to pass secret strings over a request that abstracts the data.
* The ```spotify-web-api``` library is a wrapper for communicating with Spotify web API.

# Key Code Excerpts

Here is a discussion of the most essential procedures, including a description of how they embody ideas from 
UMass Lowell's COMP.3010 Organization of Programming languages course.

Five examples are shown and they are individually numbered. 

## 1. Reading CSV file and parsing the data.

The following code reads the .csv file and places the data into a list.

```
(define music-list(csv->list (make-csv-reader (open-input-file "test.csv"))))

(define header (first music-list))

(define body (rest music-list))

(define song (string->symbol (first header))) ; returns 'song
(define artist (string->symbol (second header))) ;song 'author
(define time (string->symbol (third header))) ; 'time
 ```

Next we parse the header to find ```Song``` , ```Artist``` , and ``` Time``` and create an object for each one. This will be needed to create specific type of hashes.

The ```body``` object is the actual data that will need to be hashed.

 
## 2. Create JSON Expressions and write to file

The code below is a very manual method for creating a JSON object. 

```
(define jsexpr7 (make-hash (list (cons song (first(third body))))))
(define jsexpr8 (make-hash (list (cons artist (second(third body))))))
(define jsexpr9 (make-hash (list (cons time (third (third body))))))
```

If using ```(hash-ref 'song jsexp7)```  would return one of the songs from the original.

``` 
(define track3 (hash-append jsexpr7 jsexpr8 jsexpr9))

(define (hash-append . hashes)
    (make-immutable-hasheq
       (apply append
          (map hash->list hashes))))

```
After we have a hash of the song, author, and time, ```hash-append``` is used to combine an infinite amount of individual hashes into one hash. The combination forms a hash with three keys and their respective values are enclosed in a JSON expression. The resulting expression represents three hashes of song, author, time all hashed into what is effectively one row from the original CSV file.

```
(define song-list (list track1 track2 track3))

(call-with-output-file* "music.json" #:exists 'truncate
                        (lambda (o) (write-json song-list o)))  ;;;print to file
```
To conclude the conversion all tracks are added to a list and written to an output file.


## 3. Reading the JSON File and Parsing the Data on NodeJS 
```
fs.readFile( '../music.json' ,"utf-8" ,function(err, obj) {

    try {
      obj = JSON.parse(obj);
    }
    catch(e) {
      console.log("Error With Parsing");
      return;
    }
```
In the above code abstraction and OO are used to load the JSON object.  ```readfile``` creates a string of the file. Then ```JSON.parse()``` takes care of pairing the keys with the data values. 

```
for(var k in obj){
      songArr[k] = obj[k].Song;
      authorArr[k] = obj[k].Author;
    }
```

```songArr``` and ```authorArr``` are the arrays used to save the data using the JSON objsect getters.

## 4. Searching Spotify and Adding the Tracks to the Playlist

The code below formats a string with the name and author of a track to retrieve a track ID. This unique ID is needed for adding a song to the playlist. Yet again the process for this is abstracted using the Spotify node wrapper.

```
for(var i = 0; i < count; i++) {
      strArr[i] = 'track:' + songArr[i] + ' ' + 'artist:' + authorArr[i];
    //search array of tracks for
    spotifyApi.searchTracks(strArr[i])

var firstPage = data.body.tracks.items;
      firstPage.forEach(function(track, index) {
          if(index === 0){
            bestSong = 'spotify:track:' + track.id;

```

```firstPage``` returns the top 12 tracks found from a search. The condition ```index == 0``` saves the most popular track found.

```
spotifyApi.addTracksToPlaylist(userID, playlistId, bestSong);
```
Finally, the track is added to the playlist using the username, playlist ID, and track ID. The add process occurs for all indices of ```strArr[i]```.
