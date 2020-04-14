// This creates an option for when the user right clicks a selected text
chrome.contextMenus.create({
    "contexts": ["selection"], // this line makes the option available only on selected text
    "visible": true, 
    "onclick": addSelectedTextToStorage,
    "title": "Add Text"
}); 

function addSelectedTextToStorage(info) {
    addStringToStorage(info.selectionText);
}

chrome.commands.onCommand.addListener(function(command) {
  if (command == "add_text") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {isShortcutPressed: true});
      chrome.runtime.onMessage.addListener(function(request) {
        addStringToStorage(request.selectedText);
      });
    });
  }
});

// ";;;" is a separator. It is intended to separate the text that will be added, 
// since they will all be added to the same variable in the storage
function addStringToStorage(strg) {
  chrome.storage.sync.get(['text'], function(result) {
    let text;
    if(result.text) {   
      text = result.text + ";;;" + strg;        
      chrome.storage.sync.set({'text': text});  
    } else {                                    
      text = ";;;" + strg;                      
      chrome.storage.sync.set({'text': text});  
    }
  });
}