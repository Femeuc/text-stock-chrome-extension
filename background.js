console.log("background running!");

// This method creates an option for when the user right clicks a selected text
chrome.contextMenus.create({
    "contexts": ["selection"], // this line makes the option available only on selected text
    "visible": true, 
    "onclick": addText, // function triggered clicking the option
    "title": "Add Text"
}); 

// Fill the selectedText variable when the extension first loads
chrome.storage.sync.get(['text'], function(result) {
  if(result.text) {
    updateArrayOfText(result.text);
    selectedText = result.text;
  } else {
    updateArrayOfText("");
  }
});

// Adds the selected text to the chrome storage
function addText(info) {
    let text;
    chrome.storage.sync.get(['text'], function(result) {
      if(result.text) {
        let storedText = result.text;
        text = storedText + ";;;" + info.selectionText;
        console.log("STORED TEXT: " + storedText);
        chrome.storage.sync.set({'text': text});
        console.log("TEXT APENAS: " + text);
      } else {
        text = ";;;" + info.selectionText;
        chrome.storage.sync.set({'text': text});
        console.log("TEXT APENAS: " + text);
      }
    });
}

// Updates the selectedText variable whenever the storage updates
chrome.storage.onChanged.addListener(function(changes) {
  chrome.storage.sync.get(['text'], function(result) {
    if(result.text) {
      updateArrayOfText(result.text);
    } else {    // empty the arrayOfText
      updateArrayOfText("");  // This will be executed when the user clears the storage
    } 
  });
});

var arrayOfText;

function updateArrayOfText(textToMakeArray) {
  arrayOfText = textToMakeArray.split(";;;"); 
}