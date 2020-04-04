console.log("background running!");

// This method creates an option for when the user right clicks a selected text
chrome.contextMenus.create({
    "contexts": ["selection"], // this line makes the option available only on selected text
    "visible": true, 
    "onclick": printSth, // function triggered clicking the option
    "title": "Felipe Option"
});

// This is what happens then option is clicked
function printSth(info, tab) {
    console.log("Click em mim!"); 
    console.log(info.selectionText)
    console.log(info.editable)

    chrome.tabs.query({ // Sends the selected text to different contexts
        active: true, 
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, info.selectionText);
    });
}

