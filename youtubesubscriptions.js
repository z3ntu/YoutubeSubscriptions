var channelId;
var downloadArray = [];


$(document).ready(startUp);

function startUp() {
  console.log("Startup complete!");
}

function buttonClick() {
  $('#downloadA').hide();
  if($( "#channelId" ).val().length == 0){
    console.log("no empty channel id!");
    return;
  }
  channelId = $( "#channelId" ).val();
  console.log("Button!");
  sendRequest();
}

function sendRequest(pageToken) {
  pageToken = typeof pageToken !== 'undefined' ? pageToken : "";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId="+channelId+"&maxResults=50&key=AIzaSyDj9YqF_4EZsxucOI8fX1x24S7KTcqPJjM&pageToken="+pageToken,
    "method": "GET",
    "headers": {}
  }
  console.log(settings.url);
  $.ajax(settings).done(handleResponse);
}

function handleResponse(response) {
  $.each(response.items, foreachCallback);
  // downloadArray = $.merge(downloadArray, response.items);
    console.log(response);
    console.log(downloadArray);
    if(typeof response.nextPageToken === 'undefined'){
      console.log("last one :(");
      $('#downloadA').attr("download", "youtubesubscriptions.json");
      $('#downloadA').attr('href', "data:application/json,"+JSON.stringify(downloadArray));
      $('#downloadA').show();
    } else {
      sendRequest(response.nextPageToken);
    }
    console.log(response.nextPageToken);
}

function foreachCallback(key, value) {
console.log(value.snippet.title + ", " + value.snippet.channelId);
downloadArray.push({title:value.snippet.title, channelId:value.snippet.channelId});
}
