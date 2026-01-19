chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_SELECTION") {
    const text = window.getSelection()?.toString();

    if (text) {
      chrome.runtime.sendMessage({
        selectedText: text
      });
    }
  }
});
