var textItem = document.getElementsByClassName("text-item")[0];
var textList = document.getElementById("text-list");
var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js
//textItem.innerHTML = background.selectedText;
for(item of background.arrayOfText) {
    let listItem = document.createElement("li");
    listItem.innerHTML = item;
    textList.appendChild(listItem);
    //textItem.innerHTML += item;
}