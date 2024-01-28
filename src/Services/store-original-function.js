export function storeOriginalContent(originalContents) {
  let elements = document.querySelectorAll("p");
  elements = Array.from(elements);

  elements.forEach((element, index) => {
    if (!originalContents[index]) {
      originalContents[index] = element.innerHTML;
    }
  });
}
