console.log("Popup.js running!!!")
let h1 = document.getElementById("target");
chrome.runtime.onMessage.addListener( // receives the message sent from background.js
    function(request, sender, sendResponse) { 
        console.log(request);
        h1.innerHTML = request;
        h1.style.display = "none";
});