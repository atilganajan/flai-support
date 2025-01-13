
// Chrome uzantısı için mesaj dinleyici
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Background.js'e gelen mesaj:", message);

  return true; 
});
