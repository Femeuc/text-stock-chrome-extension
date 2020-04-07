var textList = document.getElementById("text-list");
var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

var counter = 0;

for(item of background.arrayOfText) {
    if(background.arrayOfText.length == 1) { // If there is only one element, then it is 
        break;  // an empty string, so we don't need to create an <li> element
    }
    let listItem = document.createElement("li");
    listItem.innerHTML = item;
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
