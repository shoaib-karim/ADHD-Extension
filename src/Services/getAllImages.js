export function getAllImages() {
  let images = document.querySelectorAll("img");
  images = Array.from(images);
  let x = [];
  images.forEach((img, i) => {
    if (img.src) {
      x.push(img);
    }

  })

  function isAdImage(image) {
    const altText = image.getAttribute('alt');
    const fileName = image.src.split('/').pop(); // Extract the file name from the image URL

    // Example: Check if alt text or file name contains common ad-related keywords
    if (altText && altText.toLowerCase().includes('ad') || fileName.toLowerCase().includes('ad')) {
      return true;
    }

    // Example: Check if the image is inside a container with an "ad" class
    const parentContainer = image.closest('.ad-container');
    if (parentContainer !== null) {
      return true;
    }

    // You can add more checks here based on different attributes
    // Return true if the image is likely an advertisement, otherwise return false
    return false;
  }
  // Filter out images that are likely advertisements
  const nonAdImages = Array.from(images).filter(image => !isAdImage(image));

  return nonAdImages;
}
