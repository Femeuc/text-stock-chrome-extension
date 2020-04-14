var textList = document.getElementById("text-list");
var arrayOfText; // This array will be used to build the list (<ul>)
var lengthOfTheLargestText = 0; // Helps set the width of the popup window

// Initializes everything
chrome.storage.sync.get(['text'], function(result) { 
    if(result.text) {                                
      updateArrayOfText(result.text);
    } else {
      updateArrayOfText(""); // If there's stored yet, it starts empty
    }
    loadListOfText();
    setHeadingText();
    setPopupWindowWidth();
});

var deleteButton = document.getElementById('deleteButton');
deleteButton.onclick = function () {
    let positionToBeDeletedInput = document.getElementById("inputField").value;
    for(let i = 0; i < textList.childNodes.length; i++) {
        if(i == positionToBeDeletedInput - 1) { // "-1" because an array start at 0
            let textToBeDeleted = textList.childNodes[i]; 
            textToBeDeleted.removeChild(textToBeDeleted.childNodes[1]); // this removes the <span> element
            textList.removeChild(textList.childNodes[i]);
            let newTextToUpdateTheStorage = arrayOfText.filter((text) => {
                if(text !== textToBeDeleted.innerText) {
                    return true;
                }
                return false;
            });
            newTextToUpdateTheStorage = newTextToUpdateTheStorage.join(";;;"); // The reason for the ";;;" is explained in background.js file
            chrome.storage.sync.set({'text': newTextToUpdateTheStorage});
        }
    }
}

chrome.storage.onChanged.addListener(function(changes) {
    chrome.storage.sync.get(['text'], function(result) { 
        if(result.text) {                                
            updateArrayOfText(result.text);
        } else {
            updateArrayOfText("");
        }
        deleteListOfText();
        loadListOfText();
    });
});

function updateArrayOfText(textToMakeArray) {
  arrayOfText = textToMakeArray.split(";;;"); 
}

function loadListOfText() {
    for(let i = 0; i < arrayOfText.length; i++) {
        if(i == 0) {    // The first element is just an empty string, so we don't need    
            continue;   // an <li> element for it.
        }

        let listItem = document.createElement("li");
        listItem.innerHTML = arrayOfText[i];
        textList.appendChild(listItem);

        let deleteId = document.createElement("span");
        deleteId.innerHTML = "{" + i + "}";
        listItem.appendChild(deleteId);

        if(listItem.innerHTML.length > lengthOfTheLargestText) {
            lengthOfTheLargestText = listItem.innerHTML.length;
        }
    }
}

function setPopupWindowWidth() {
    if(lengthOfTheLargestText >= 15) { 
        let att = document.createAttribute("style");
        att.value = `width: ${lengthOfTheLargestText * 6}px; max-width: 600px;`;
        textList.setAttributeNode(att); 
    }
}

function setHeadingText() {
    if(arrayOfText.length == 1) {
        document.getElementById("h1").innerHTML = "[ no text added yet ]";
        document.getElementById('input-div').setAttribute("class", "input-div invisible");
    } else {
        document.getElementById("h1").innerHTML = "Text added";
        document.getElementById('input-div').setAttribute("class", "input-div");
    }
}

function deleteListOfText() {
    while(textList.childNodes.length) {
        textList.childNodes[0].remove();
    }
}