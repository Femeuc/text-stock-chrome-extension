// Cria o menu UMA ÚNICA VEZ
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-text",
    title: "Add Text",
    contexts: ["selection"]
  });
});

// Clique no menu de contexto
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "add-text" && info.selectionText) {
    addStringToStorage(info.selectionText);
  }
});

// Atalho de teclado
chrome.commands.onCommand.addListener((command) => {
  if (command === "add_text") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "GET_SELECTION" });
    });
  }
});

// Recebe texto do content script
chrome.runtime.onMessage.addListener((request) => {
  if (request.selectedText) {
    addStringToStorage(request.selectedText);
  }
});

// Storage
function addStringToStorage(strg) {
  if (!strg) return;

  chrome.storage.sync.get(["text"], (result) => {
    const newText = result.text
      ? result.text + ";;;" + strg
      : strg;

    chrome.storage.sync.set({ text: newText });
  });
}
