var clearButton = document.getElementById('clear-button');
clearButton.onclick = function() {
    chrome.storage.sync.clear();
    document.getElementsByTagName("p")[0].innerHTML = "<strong>Text deleted</strong>";
}