let originalContents = {}; // Store original content

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "documents") {
    if (request.action === "toggle") {
      if (request.checked) {
        // Toggle is checked, store original content
        storeOriginalContent();
        applyEmphasis();
      } else {
        // Toggle is unchecked, revert to original content
        revertToOriginalContent();
      }

      sendResponse({ success: true });
      return true; // Ensure sendResponse works asynchronously
    }
  }
});

function storeOriginalContent() {
  let elements = document.querySelectorAll("p");
  elements = Array.from(elements);

  elements.forEach((element, index) => {
    if (!originalContents[index]) {
      originalContents[index] = element.innerHTML;
    }
  });
}

function applyEmphasis() {
  let elements = document.querySelectorAll("p");
  elements = Array.from(elements);

  elements.forEach((element, index) => {
    element.innerHTML = emphasizeHalf(originalContents[index]);
  });
}

function revertToOriginalContent() {
  let elements = document.querySelectorAll("p");
  elements = Array.from(elements);

  elements.forEach((element, index) => {
    if (originalContents[index]) {
      element.innerHTML = originalContents[index];
    }
  });

  // Clear the stored original content
  originalContents = {};
}

function emphasizeHalf(text) {
  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;

  // Define the tags to keep ('p' and 'dd' in this case)
  const allowedTags = ["p", "dd"];

  // Recursively remove unwanted tags and their content
  const filterTags = (node) => {
    const children = Array.from(node.children);

    for (const child of children) {
      if (!allowedTags.includes(child.tagName.toLowerCase())) {
        // Remove unwanted tags and their content
        node.removeChild(child);
      } else {
        // Recursively filter children
        filterTags(child);
      }
    }
  };

  // Filter out unwanted tags
  filterTags(tempDiv);

  // Get the text content after filtering
  const filteredText = tempDiv.textContent || tempDiv.innerText;

  // Split the text into words
  const words = filteredText.split(/\s+/);

  // Process each word
  const emphasizedWords = words.map((word) => {
    const length = word.length;
    const halfLength = Math.ceil(length / 2);

    // Wrap the first half of the word in <b> tags
    const emphasizedWord =
      "<b>" + word.substring(0, halfLength) + "</b>" + word.substring(halfLength);

    return emphasizedWord;
  });

  // Join the words back into a sentence
  const emphasizedText = emphasizedWords.join(" ");

  return emphasizedText;
}
