export function removeFlag() {
  // Get a reference to the div with the specified ID
  const divToRemove = document.getElementById("adhd-convertion-flag");

  // Check if the div exists before attempting to remove it
  if (divToRemove) {
    // Get a reference to its parent node
    const parentElement = divToRemove.parentNode;

    // Remove the div from its parent node
    parentElement.removeChild(divToRemove);

    console.log("The div has been successfully removed.");
  } else {
    console.log("The div does not exist in the document.");
  }
}
