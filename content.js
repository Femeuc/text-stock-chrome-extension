console.log("Chrome extension ready to go!!!");

chrome.storage.onChanged.addListener(function(changes, namespace) {
    let hai = chrome.storage.sync.get(['key']);
console.log(hai);
});
