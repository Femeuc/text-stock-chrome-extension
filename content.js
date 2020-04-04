console.log("Chrome extension ready to go!");

window.addEventListener('mouseup', selectWord);

function selectWord() {
    let selectedText = window.getSelection().toString(); // gets the text select by the mouse
    console.log("+++++" + selectedText + "+++++");
}

chrome.runtime.onMessage.addListener(  // receives the text sent from background.js
    function(request, sender, sendResponse) { 
        console.log(request);
});
