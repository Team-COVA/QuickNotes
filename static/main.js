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


submit.onclick = function buttonAction(){

    var title = document.getElementById("title").value;
    var content = document.getElementById("contents").value;
    var data = {
        'Title': title,
        'Contents': content,
        'Submit Date': submitDate
        }

    console.log(data);

function dataPost(url){
    var xhr = new XMLHttpRequest();
    var url = '/submitNote';


    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200);
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        var jsonData = JSON.stringify(data);
        xhr.send(jsonData);

}

dataPost("/submitNote");


}
clear.onclick = function(){
    document.getElementById("title").value = ""
    document.getElementById("contents").value = ""
}



//submit request to server for the time when the page loads
httpGetAsync("http://localhost:5000/getServerTime", requestCallback);

