let textItem = document.getElementsByClassName("text-item")[0];
var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js
textItem.innerHTML = background.selectedText;