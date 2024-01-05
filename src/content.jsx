import { myCal } from "./Services/get-elements";
import { getAllImages } from "./Services/getAllImages";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

   
    if (request["type"] == 'documents') {
      let elements= myCal();
      elements = Array.from(elements)
      let pArray = []
      elements?.map((e,i)=>{
        let x = {index:i, text: e.innerText}
        pArray.push(x);
      })
      sendResponse(pArray);// this is how you send message to popup

    }
    return true; // this make sure sendResponse will work asynchronously

  }
);
