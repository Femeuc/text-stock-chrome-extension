console.log("background running!");

// This method creates an option for when the user right clicks a selected text
chrome.contextMenus.create({
    "contexts": ["selection"], // this line makes the option available only on selected text
    "visible": true, 
    "onclick": addText, // function triggered clicking the option
    "title": "Add Text"
});

var selectedText = ""; // global variable // it used the popup.js

// Fill the selectedText variable when the extension first loads
chrome.storage.sync.get(['text'], function(result) {
  if(result.text) {
    selectedText = result.text;
  } 
});

// Adds the selected text to the chrome storage
function addText(info) {
    
    let text = selectedText + ";;;" + info.selectionText;
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'text': text});
    return;
    selectedText = text;
    console.log(text);
}

// Updates the selectedText variable whenever the storage updates
chrome.storage.onChanged.addListener(function(changes) {
  chrome.storage.sync.get(['text'], function(result) {
    if(result.text) {
      selectedText = result.text;
    } else {
      selectedText = "";
    } 
  });
  console.log(changes);
});