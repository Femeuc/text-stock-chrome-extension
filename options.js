var clearButton = document.getElementById('clear-button');
clearButton.onclick = function() {
    chrome.storage.sync.clear();
}