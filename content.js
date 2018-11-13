// process all scripts on the page
var scripts = document.getElementsByTagName('script');
for (var i = 0, l = scripts.length; i < l; i++) {
  // check if the text attribute contains the devtools event listener
  if (scripts[i].text.includes('devtoolschange')) {
    // post a notification
    chrome.runtime.sendMessage({
      url: window.location.toString()
    }, function (response) {});
    // check if the src attribute is a JS file
  } else if (scripts[i].src.match("\.js$")) {
    sendRequest(scripts[i].src)
  }
}

// sendRequest downloads the script and looks for the devtools event listener
function sendRequest(url) {
  console.log("sending request to " + url)
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.responseText.includes('devtoolschange')) {
        // post a notification
        chrome.runtime.sendMessage({
          url: url
        }, function (response) {});
      }

    };
  }
  req.send();
}