/* This test class provides an example of how to take a csv file
    and parse it to a JSON file following the format of 
    ‘{mac : mac, created : createdDate, payload : {}, received : receivedDate}’ 
    where the payload is a JSON array of key-value pairs parsed 
    for a particular timestamp, created is the current time, received is 
    the parsed time and the mac is the tag name.
*/


// CVS file name to be parsed
var CSVFileName = "2020-02-09T16.00.00-testfile3.csv";
// JSON file name to be created
var JSONFileName = "2020-02-09T16.00.00-testfile3.json";

// Importing csvJSON function to parse csv file
var csvtool = require('./csvJSON');

// Reading csv file
var fs = require('fs');
var textByLine = fs.readFileSync(CSVFileName).toString();

// Parsing csv file. result receiv the JSON object
var result = [];
result = csvtool.csvJSON(textByLine);

// Convert a JavaScript object into a string
const jsonString = JSON.stringify(result)


// Write JSON file
fs.writeFile('./'+JSONFileName, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

// Sending JSON file to a FTP service
// FTP connection
var Client = require('ftp');
  
  var c = new Client();
  c.on('ready', function() {
    // upload JSON file to the FTP server
    c.put(JSONFileName, JSONFileName, function(err) {
      if (err) throw err;
      c.end();
    });
  });

  // FTP connections settings
  var connectionProperties = { 
    host: "localhost",
    port: "21",
    user: "anonymous",
    password: "",
};
  // connect to localhost:21 as anonymous
  c.connect(connectionProperties);