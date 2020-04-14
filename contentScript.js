// This is triggered when the user presses the keyboard shortcut (Ctrl+Shift+A)
// It sends the selected text to the background
chrome.runtime.onMessage.addListener(function(request) {
  let selectionText = window.getSelection().toString();
    if(request.isShortcutPressed && selectionText)
      chrome.runtime.sendMessage({selectedText: window.getSelection().toString()});
});
