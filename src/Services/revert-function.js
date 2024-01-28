export function revertToOriginalContent(originalContents) {
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
