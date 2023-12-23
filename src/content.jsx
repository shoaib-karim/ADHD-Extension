import { getAllImages } from "./Services/getAllImages";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request["type"] == 'images') {
      console.log("msg receive from popup");
      let images = Array.from(getAllImages());

      let tempImg = [];
      images?.map((img, i) => {
        let tempObj = {
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt"),
        };
        tempImg.push(tempObj);
        if (i == images.length - 1) {
          sendResponse(tempImg);
        }
      });

      sendResponse(imgArr);// this is how you send message to popup

    }
    return true; // this make sure sendResponse will work asynchronously

  }
);
