// chrome.action.onClicked.addListener(function (tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {
//       message: "toggle_extension",
//     });
//   });
// });

chrome.action.onClicked.addListener(function (tab) {
  // Send a message to the active tab

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Forward the message to the popup
    chrome.runtime.sendMessage({ message: message.message });

  });
  chrome.tabs.query({ active: true, currentWindow: true },
    function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id,
        { "message": "clicked_browser_action" }
      );
      chrome.runtime.sendMessage({ message: "sfdjafdskdsakdfkj" });
    });
});

