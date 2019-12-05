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
var submitDate = new Date();
//var test = document.getElementById("test");
var Test = document.getElementById("Test");


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
//Test.onclick = function(){
//
//    httpGetAsync("/getFileLists", function(response){
//        console.log(response);
//    });
//
//
//}


clear.onclick = function(){
    document.getElementById("title").value = ""
    document.getElementById("contents").value = ""
    console.log("cleared");

}
document.addEventListener("DOMContentLoaded", function(event) {
     httpGetAsync("/getFileLists", function(response){
        var dataArray = eval(response);
        var dataLen = dataArray.length;
        //console.log(dataArray[0]);
        for (var i = 0; i < dataLen; i++){
            console.log(dataArray[i].Title)
//        prints list of values in array for the length of the array in the console

//            document.getElementById("getTitle").innerHTML = dataArray[i].Title;
 var htmlHeader = "<li>Title</li>";
            htmlHeader = htmlHeader.replace("Title", "Title: " + dataArray[i].Title);
        // Creating variable to replace

//        var htmlBody = "<li>Content</li>";
//            htmlBody.replace("Content", "Contents: " + dataArray.Content);

//        var htmlDate = "<p>Date created</p>";
//            htmlDate.replace("Date created", "Date: " + dataArray.dateCreated);

        document.getElementById("getTitle").innerHTML = htmlHeader;
        }

    })

 });



httpGetAsync("/getServerTime", requestCallback);

