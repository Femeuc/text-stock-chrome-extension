var textList = document.getElementById("text-list");
//var arrayOfText = getTheBackgroundPage().arrayOfText; // function created here
var arrayOfText;
var counter = 0;

chrome.storage.sync.get(['text'], function(result) { // this function will initialize
    if(result.text) {                                // the arrayOfText variable
      updateArrayOfText(result.text);
    } else {
      updateArrayOfText("");
    }
    loadListOfText();
    setHeadingText();
    setPopupWindowWidth();
});

var inputButton = document.getElementById('inputButton');
inputButton.onclick = function () {
    let userInput = document.getElementById("inputField").value;
    for(let i = 0; i < textList.childNodes.length; i++) {
        if(i == userInput) {
            let textToBeDeleted = textList.childNodes[i]; 
            textToBeDeleted.removeChild(textToBeDeleted.childNodes[1]); // this removes the <span> element
            textList.removeChild(textList.childNodes[i]);
            let newTextToBeAdded = arrayOfText.filter((text) => {
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

chrome.storage.onChanged.addListener(function(changes) {
    document.getElementById("h1").innerHTML = "[ no text added yet ]";
    chrome.storage.sync.get(['text'], function(result) { // this function will initialize
        if(result.text) {                                // the arrayOfText variable
            updateArrayOfText(result.text);
        } else {
            updateArrayOfText("");
        }
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

        if(listItem.innerHTML.length > counter) {
            counter = listItem.innerHTML.length;
        }
    }
}

function setPopupWindowWidth() {
    console.log(counter);
    if(counter >= 15) {  // This is just a workaround to set the width of the popup window
        let att = document.createAttribute("style");  // according to the length of the text
        att.value = `width: ${counter * 5}px; max-width: 600px;`; // in it.
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