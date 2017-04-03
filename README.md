# Playlist-Curator

### Statement
OPL Final Project by Ethan Cumming and Christian Okoli. We will utilize the spotify api to create a playlist from a .csv file.

### Analysis
The project will utilize the concepts of data abstraction, object orientation, and recursion. Data abstraction is used primarily to import our data from a .csv file and transform the data into an acceptable type for the Spotify Web API to understand(XML/JSON). Additionally, if we are to access a user account from Spotify will need OAuth library, which uses abstraction for security purposes. Furthermore, object orientation will be used with the web-server package which can create an HTTP client based on user input. Finally, recursion will be used to parse and feed individual track data to the Spotify API to complete a playlist.

### External Technologies 
Spotify Web API - To communicate with the Spotify Web App which will build the playlist

OAuth – Authorization protocol to access user information

### Data Sets or other Source Materials
Data from a music library will be imported from a .csv file. This data can be acquired by selecting the music from your preferred music manager and copying it into an excel spreadsheet. From there export the spreadsheet as a .csv file.

### Deliverable and Demonstration
The end product will have the user upload a file and enter their Spotify credentials. Moreover, a playlist will be created and the data will be parsed to add all the songs into the playlist. When the process is complete, the user will be presented with a webpage of the playlist. 

### Evaluation of Results
The project will be successful if the curated playlist contains the whole of the imported data and if the procedure is accomplished relatively quickly (less than 5 minutes). Additionally, another barometer for success is the ease in which the user accomplishes their task.  

## Architecture Diagram
Upload the architecture diagram you made for your slide presentation to your repository, and include it in-line here.

Create several paragraphs of narrative to explain the pieces and how they interoperate.

## Schedule
### First Milestone (Sun Apr 9)
HTTP client setup. Functionality inlcudes uploading/importing the .csv file and user input formated correctly for the client.

### Second Milestone (Sun Apr 16)
HTTP client communicates with Spotify API. Functionality includes generating a playlist and sending parsed data to add to the playlist.

### Public Presentation (Mon Apr 24, Wed Apr 26, or Fri Apr 28 [your date to be determined later])
A browser opening the link to the playlist sent by the Spotify. A feature that will be necessary for the presentation.

## Group Responsibilities

### Ethan Cumming @EthanNC
I will work on uploading the .csv to the HTTP client and formatting the data. From there I will work on how to send the data from the client to Spotify and making unit tests to ensure all the data reaches it destinations and completes certain actions. 

### Christian @cokoli238
I will work on passing login credentials to server.
