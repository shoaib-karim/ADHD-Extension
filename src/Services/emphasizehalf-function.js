export function emphasizeHalf(text) {
  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;

  // Define the tags to keep ('p' and 'dd' in this case)
  const allowedTags = ["p", "dd"];

  // Recursively process only text nodes, skip other elements
  const processTextNodes = (node) => {
    const childNodes = node.childNodes;

    for (const childNode of childNodes) {
      if (childNode.nodeType === 3) {
        // Text node
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
      } else if (
        childNode.nodeType === 1 &&
        allowedTags.includes(childNode.tagName.toLowerCase())
      ) {
        // Recursively process child nodes for allowed tags
        processTextNodes(childNode);
      }
    }
  };

  // Process text nodes within the allowed tags
  processTextNodes(tempDiv);

  return tempDiv.innerHTML;
}
