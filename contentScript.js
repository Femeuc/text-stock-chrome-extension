chrome.runtime.onMessage.addListener(function(request) {
  let selectionText = window.getSelection().toString();
    if(request.isShortcutPressed && selectionText)
      chrome.runtime.sendMessage({selectedText: window.getSelection().toString()});
});