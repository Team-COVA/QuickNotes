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
//var Test = document.getElementById("Test");
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
    window.location.reload(true);//this reloads the page on the click of the save button
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

    httpGetAsync("/file_read", function(response){

        var dataArray = eval(response);
        var dataLen = dataArray.length;
       // dataArray.reverse()  // This reverses the array so the newest entry is displayed at the top of the notes list


        for (var i = 0; i < dataLen; i++){

            var noteList = document.getElementById("noteList");
            var listItem = document.createElement('li');
            var htmlBody = document.createElement('p');
            var htmlDate = document.createElement('p');
            var htmlHeader = document.createElement('p');
            var htmlLastMod = document.createElement('p');
            //Create variables to house the 'create element' tags we will be using to store looping
            //variables we need.

            htmlHeader.innerHTML = "Title: " + dataArray[i].Title;
            htmlBody.innerHTML = "Contents: " + dataArray[i].Contents;
            htmlDate.innerHTML = "Date Created: " + dataArray[i]["Creation_Date"];
            htmlLastMod.innerHTML = "Last Modified: " + dataArray[i]["Last_Modified"];
            //Set the html property of the variable 'object' (in this case the string) to looping
            //variable [i] with a string attached to it.
            //console.log(dataArray[i].Title);

            //console.log(titleShave)
            listItem.appendChild(htmlHeader);
            listItem.appendChild(htmlBody);
            listItem.appendChild(htmlDate);
            listItem.appendChild(htmlLastMod);
            // Adds variables (htmlHeader, etc) to the list item 'listItem'
            noteList.appendChild(listItem);
            // Tethers all variables (now in listItem) to the unordered list tag id 'noteList' in the index.html
            //Coded by Damarea Timmons (11/16 - 11/30)

            //This long line removes the .txt from the title name----------------
            const modalTitle = dataArray[i].Title.slice(0, dataArray[i].Title.length - 4);
            const modalContent = dataArray[i].Contents;
            listItem.ondblclick = function(){
                var span = document.getElementsByClassName("close")[0]
                newPopup.style.display = "block"; // this opens the modal on a double click
                span.onclick = function() {
                newPopup.style.display = "none"; //this closes the modal with the x button
                    };
                document.getElementById("titleMod").value= modalTitle;
                document.getElementById("contentsMod").value= modalContent;
                };
            };
    });
});

//submit request to server for the time when the page loads
httpGetAsync("/getServerTime", requestCallback);

clearMod.onclick = function(){
    //document.getElementById("titleMod").value = ""
    document.getElementById("contentsMod").value = ""
    };
submitMod.onclick = function buttonActionNew(){
    var titleNew = document.getElementById("titleMod").value;
    var contentNew = document.getElementById("contentsMod").value;
    //var modDate = new Date();
    var payLoadNew = {
        'Title': titleNew,
        'Contents': contentNew
        }
        dataPost("/submitNote", payLoadNew);
        window.location.reload(true);//this reloads the page on the click of the save button
    };
