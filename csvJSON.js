module.exports = {
    /* This function receive a csv file as a string 
       variable and parse it into a JSON object */
    csvJSON: function (csv){
    //var csv is the CSV file with headers

    var lines=csv.split("\n");  
    var result = [];  
    var headers=lines[0].split(",");
  
    // Parse csv file line by line and it constructs a JSON 
    // objects to be sent to an ingestion service
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var payload = {};
        var currentline=lines[i].split(",");

        obj["mac"] = "mac";
        obj["created"] = currentline[0]; // time when the sample was collected
        obj["payload"] = [];    // JSON array of key-value pairs 
  
        for(var j=1;j<headers.length;j++){     
            payload[headers[j]] = currentline[j];
        }
        
        obj["payload"].push(payload);
        
        // parsed time
        var date = new Date();
        obj["received"] = date; 
  
        result.push(obj);  
    }
    
    return result; 
  }
}