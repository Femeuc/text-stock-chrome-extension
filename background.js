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

chrome.commands.onCommand.addListener(function(command) {
  if (command == "add_text") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {isShortcutPressed: true});
      chrome.runtime.onMessage.addListener(function(request) {
        addToStorage(request.selectedText);
      });
    });
  }
});

function addToStorage(data) {
  chrome.storage.sync.get(['text'], function(result) {
    let text;
    if(result.text) {
      let storedText = result.text;
      text = storedText + ";;;" + data;
      chrome.storage.sync.set({'text': text});
    } else {
      text = ";;;" + data;
      chrome.storage.sync.set({'text': text});
    }
  });
}