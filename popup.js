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

    let deleteId = document.createElement("span");
    deleteId.innerHTML = "{" + i + "}";
    listItem.appendChild(deleteId);

    if(listItem.innerHTML.length > counter) {
        counter = listItem.innerHTML.length;
    }
}

if(counter >= 15) {  // This is just a workaround to set the width of the popup window
    let att = document.createAttribute("style");  // according to the length of the text
    att.value = `width: ${counter * 9}px; max-width: 600px;`; // in it.
    textList.setAttributeNode(att); 
}

var inputButton = document.getElementById('inputButton');
inputButton.onclick = function () {
    let userInput = document.getElementById("inputField").value;
    console.log("i < " + textList.childNodes.length);
    for(let i = 0; i < textList.childNodes.length; i++) {
        console.log(textList.childNodes[i] + ": node type == " + textList.childNodes[i].nodeValue);
        console.log(i + " == " + userInput + ": " + (i == userInput));
        if(i == userInput) {
            let textToBeDeleted = textList.childNodes[i]; 
            textToBeDeleted.removeChild(textToBeDeleted.childNodes[1]); // this removes the <span> element
            textList.removeChild(textList.childNodes[i]);
            let newTextToBeAdded = background.arrayOfText.filter((text) => {
                if(text !== textToBeDeleted.innerHTML) {
                    return true;
                }
                return false;
            });
            newTextToBeAdded = newTextToBeAdded.join(";;;"); // It is necessary to save the string with the ";;;" separator
            chrome.storage.sync.set({'text': newTextToBeAdded});   // ";;;" is just a separator that I've chosen, it could be any other
        }
    }
}