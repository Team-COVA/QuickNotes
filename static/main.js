/*
Initial JS File
*/

//https://stackoverflow.com/questions/247483/http-get-request-in-javascript
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        	//run the function provided as the callbacks
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous request
    xmlHttp.send(null);
}


function requestCallback(responseText)
{
	/*
	take the response text, and set it to the "serverTime"
	element on the page so the user can see it
	*/
	let serverTimePElement = document.getElementById("servertime");
	serverTimePElement.innerHTML = responseText;
}

var submit = document.getElementById("submit");
var clear = document.getElementById("clear");
var Test = document.getElementById("Test");
var submitDate = new Date();


submit.onclick = function buttonAction(){

    var title = document.getElementById("title").value;
    var content = document.getElementById("contents").value;
    var payLoad = {
        'Title': title,
        'Contents': content,
        'Submit Date': submitDate
        }

    dataPost("/submitNote", payLoad);

}

function dataPost(url, data, callback){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            console.log("POST completed");
            if (callback) callback(xhr.responseText);
        }
    }

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonData;
    if(data != null) jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}


clear.onclick = function(){
    document.getElementById("title").value = ""
    document.getElementById("contents").value = ""
    console.log("cleared");
}


document.addEventListener("DOMContentLoaded", function(event) {

    httpGetAsync("/fileread", function(response){

        var dataArray = eval(response);
        var dataLen = dataArray.length;

        for (var i = 0; i < dataLen; i++){

            var noteList = document.getElementById("noteList");
            var listItem = document.createElement('li');
            var htmlBody = document.createElement('p');
            var htmlDate = document.createElement('p');
            var htmlHeader = document.createElement('p');
            var htmlLastMod = document.createElement('p');

            htmlHeader.innerHTML = "Title: " + dataArray[i].Title;
            htmlBody.innerHTML = "Contents: " + dataArray[i].Contents;
            htmlDate.innerHTML = "Date Created: " + dataArray[i]["Creation_Date"];
            htmlLastMod.innerHTML = "Last Modified: " + dataArray[i]["Last_Modified"];
            //Set the html property of the variable 'object' (in this case the string) to...

            listItem.appendChild(htmlHeader);
            listItem.appendChild(htmlBody);
            listItem.appendChild(htmlDate);
            listItem.appendChild(htmlLastMod);
            // Adds variables (htmlHeader, etc) to the list item 'listItem'
            noteList.appendChild(listItem);
            //
        }
    });

 });

//submit request to server for the time when the page loads
httpGetAsync("/getServerTime", requestCallback);