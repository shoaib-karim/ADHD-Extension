let originalContents = {}; // Store original content

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "documents") {
    if (request.action === "toggle") {
      console.log("toggle in content.js")
      console.log(CheckFlag())
      if (request.checked) {
        // Toggle is checked, store original content
        storeOriginalContent();
        applyEmphasis();
        if (!CheckFlag())
          insertFlag();
      } else {
        // Toggle is unchecked, revert to original content
        revertToOriginalContent();
        removeFlag()
      }

      sendResponse({ success: true });
      return true; // Ensure sendResponse works asynchronously
    }
  }
  if(request.type==='flagCheck'){
    sendResponse(CheckFlag());
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

function insertFlag() {
  // Create a new div element
  const newDiv = document.createElement('div');

  // Set some attributes or content for the div (optional)
  newDiv.id = 'adhd-convertion-flag';
  newDiv.innerHTML = '';

  // // Get a reference to the head element
  // const head = document.head || document.getElementsByTagName('head')[0];

  // // Insert the div at the beginning of the head
  // head.insertBefore(newDiv, head.firstElementChild);

  const body = document.body;

  // Insert the div at the end of the body
  body.appendChild(newDiv);

}

function CheckFlag() {
  const existingDiv = document.getElementById('adhd-convertion-flag');

  if (existingDiv) {
    console.log('The div exists in the document.');
    return true
  } else {
    console.log('The div does not exist in the document.');
    return false
  }
}

function removeFlag() {
  // Get a reference to the div with the specified ID
  const divToRemove = document.getElementById('adhd-convertion-flag');

  // Check if the div exists before attempting to remove it
  if (divToRemove) {
    // Get a reference to its parent node
    const parentElement = divToRemove.parentNode;

    // Remove the div from its parent node
    parentElement.removeChild(divToRemove);

    console.log('The div has been successfully removed.');
  } else {
    console.log('The div does not exist in the document.');
  }

}

// function emphasizeHalf(text) {
//   // Create a temporary div element to parse the HTML
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = text;

//   // Define the tags to keep ('p' and 'dd' in this case)
//   const allowedTags = ["p", "dd"];

//   // Recursively remove unwanted tags and their content
//   const filterTags = (node) => {
//     const children = Array.from(node.children);

//     for (const child of children) {
//       if (!allowedTags.includes(child.tagName.toLowerCase())) {
//         // Remove unwanted tags and their content
//         // node.removeChild(child);
//       } else {
//         // Recursively filter children
//         console.log("child:", child)
//         filterTags(child);
//       }
//     }
//   };

//   // Filter out unwanted tags
//   filterTags(tempDiv);

//   // Get the text content after filtering
//   const filteredText = tempDiv.textContent || tempDiv.innerText;

//   // Split the text into words
//   const words = filteredText.split(/\s+/);

//   // Process each word
//   const emphasizedWords = words.map((word) => {
//     const length = word.length;
//     const halfLength = Math.ceil(length / 2);

//     // Wrap the first half of the word in <b> tags
//     const emphasizedWord =
//       "<b>" + word.substring(0, halfLength) + "</b>" + word.substring(halfLength);

//     return emphasizedWord;
//   });

//   // Join the words back into a sentence
//   const emphasizedText = emphasizedWords.join(" ");

//   return emphasizedText;
// }


function emphasizeHalf(text) {
  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;

  // Define the tags to keep ('p' and 'dd' in this case)
  const allowedTags = ["p", "dd"];

  // Recursively process only text nodes, skip other elements
  const processTextNodes = (node) => {
    const childNodes = node.childNodes;

    for (const childNode of childNodes) {
      if (childNode.nodeType === 3) { // Text node
        const words = childNode.nodeValue.split(/\s+/);

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

        // Replace the original text node with the emphasized HTML
        const newHtml = document.createElement("span");
        newHtml.innerHTML = emphasizedText;

        node.replaceChild(newHtml, childNode);
      } else if (childNode.nodeType === 1 && allowedTags.includes(childNode.tagName.toLowerCase())) {
        // Recursively process child nodes for allowed tags
        processTextNodes(childNode);
      }
    }
  };

  // Process text nodes within the allowed tags
  processTextNodes(tempDiv);

  return tempDiv.innerHTML;
}