// import { myCal } from "./Services/get-elements";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "documents") {
    // Get the array of texts from the response
  

    // Inject a script into the page to modify the style

    if (request["type"] == "documents") {
      let elements = document.querySelectorAll('p');
      elements = Array.from(elements);
      elements.forEach((element, index) => {
        // console.log("element:",index, element.innerHTML);

        element.innerHTML = emphasizeHalf(element.innerHTML);
      });

      // console.log("")

      setTimeout(() => {
        sendResponse({ success: true });
      }, 0);
    }
    sendResponse({ success: true });
    return true; // this make sure sendResponse will work asynchronously
  }
});

function emphasizeHalf(text) {
  // Split the text into words
  const words = text.split(/\s+/);

  // Process each word
  const emphasizedWords = words.map(word => {
    const length = word.length;
    const halfLength = Math.ceil(length / 2);

    // Wrap the first half of the word in <b> tags
    const emphasizedWord =
      '<b>' + word.substring(0, halfLength) + '</b>' + word.substring(halfLength);

    return emphasizedWord;
  });

  // Join the words back into a sentence
  const emphasizedText = emphasizedWords.join(' ');

  return emphasizedText;
}


