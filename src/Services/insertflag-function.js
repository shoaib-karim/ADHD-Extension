export function insertFlag() {
  // Create a new div element
  const newDiv = document.createElement("div");

  // Set some attributes or content for the div (optional)
  newDiv.id = "adhd-convertion-flag";
  newDiv.innerHTML = "";

  // // Get a reference to the head element
  // const head = document.head || document.getElementsByTagName('head')[0];

  // // Insert the div at the beginning of the head
  // head.insertBefore(newDiv, head.firstElementChild);

  const body = document.body;

  // Insert the div at the end of the body
  body.appendChild(newDiv);
}
