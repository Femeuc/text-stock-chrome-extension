var textList = document.getElementById("text-list");
var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

var counter = 0;

for(let i = 0; i < background.arrayOfText.length; i++) {
    if(i == 0) {    // The first element is just an empty string, so we don't need    
        continue;   // an <li> element for it.
    }
    let listItem = document.createElement("li");
    listItem.innerHTML = background.arrayOfText[i];
    textList.appendChild(listItem);
    if(listItem.innerHTML.length > counter) {
        counter = listItem.innerHTML.length;
    }
}

if(counter >= 15) {  // This is just a workaround to set the width of the popup window
    let att = document.createAttribute("style");  // according to the length of the text
    att.value = `width: ${counter * 9}px; max-width: 600px;`; // in it.
    textList.setAttributeNode(att); 
}
