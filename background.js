console.log("background running!");

// This method creates an option for when the user right clicks a selected text
chrome.contextMenus.create({
    "contexts": ["selection"], // this line makes the option available only on selected text
    "visible": true, 
    "onclick": addText, // function triggered clicking the option
    "title": "Add Text"
}); 

// Adds the selected text to the chrome storage
function addText(info) {
    let text;
    chrome.storage.sync.get(['text'], function(result) {
      if(result.text) {
        let storedText = result.text;
        text = storedText + ";;;" + info.selectionText;
        chrome.storage.sync.set({'text': text});
      } else {
        text = ";;;" + info.selectionText;
        chrome.storage.sync.set({'text': text});
      }
    });
}