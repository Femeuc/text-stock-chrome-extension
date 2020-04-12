chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      let selectionText = window.getSelection().toString();
      if (request && selectionText)
        sendResponse({selectedText: selectionText});
});