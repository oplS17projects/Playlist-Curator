# Playlist-Curator

### Statement
OPL Final Project by Ethan Cumming and Christian Okoli. We will utilize the spotify api to create a playlist from a .csv file.

### Analysis
The project utilizes the concepts of data abstraction and object orientation. Data abstraction is used primarily to import our data from a .csv file and transform the data into an acceptable type for the Spotify Web API to understand (JSON). The racket json library uses hashes to create JSON expressions which we output to create a .json file.  Furthermore, both concepts ae used with the node web web-server package which can create an HTTP client and makes abstracted calls to the spotify api . 

### External Technologies 
Spotify Web API - To communicate with the Spotify Web App which will build the playlist
Node JS with libraries - Server to run our webpage requests from.

### Data Sets or other Source Materials
Data from a music library is imported from a .csv file. This data can be acquired by selecting the music from your preferred music manager and copying it into an excel spreadsheet. From there, export to a spreadsheet as a .csv file.

### Deliverable and Demonstration
The end product have the user load a .csv file and enter their Spotify credentials. Moreover, a playlist will be created and the data will be parsed to add all the songs into the playlist. When the process is complete, the user is be presented with a of the playlist on their spotify account. 

### Evaluation of Results
The project will be successful if the curated playlist contains the whole of the imported data and if the procedure is accomplished relatively quickly (less than 5 minutes). Additionally, another barometer for success is the ease in which the user accomplishes their task.  

## Architecture Diagram
![GitHub Image](diagram1(1).png?raw=true "Diagram")

## Schedule
### First Milestone (Sun Apr 9)
HTTP client setup. Functionality inlcudes uploading/importing the .csv file and user input formated correctly for the client.

### Second Milestone (Sun Apr 16)
HTTP client communicates with Spotify API. Functionality includes generating a playlist and sending parsed data to add to the playlist.

### Public Presentation (Mon Apr 24, Wed Apr 26, or Fri Apr 28 [your date to be determined later])
A browser opening the link to the playlist sent by the Spotify. A feature that will be necessary for the presentation.

## Group Responsibilities

### Ethan Cumming @EthanNC
I worked on uploading the converted .csv file to the server and and parsing the document data. The data is then sent to to the spotify api to retrieve a song id. The song IDs are then used for adding to the playlist.

### Christian @cokoli238
I will work on passing login credentials to the server, receiving data from the Spotify client, and manipulating  the browser through racket to play the user created spotify playlist. 

### Google Slides
https://docs.google.com/presentation/d/1IHOEZ6mSUyZ_kg8vwIdXGPaEPcjL8m4pBCqgsoNCcNc/edit?usp=sharing
