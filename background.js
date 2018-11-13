chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    var opt = {
      type: "basic",
      title: request.url,
      message: "devtoolschange event listener detected!",
      iconUrl: "nope.jpg"
    }
    chrome.notifications.create(opt);
  });