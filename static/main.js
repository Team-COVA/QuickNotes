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
	let serverTimePElement = document.getElementById("serverTime");
	serverTimePElement.innerHTML = responseText;
}

//submit request to server for the time when the page loads
httpGetAsync("http://localhost:5000/getServerTime", requestCallback);
