export function CheckFlag() {
  const existingDiv = document.getElementById("adhd-convertion-flag");

  if (existingDiv) {
    console.log("The div exists in the document.");
    return true;
  } else {
    console.log("The div does not exist in the document.");
    return false;
  }
}
