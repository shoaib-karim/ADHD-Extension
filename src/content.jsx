// import { myCal } from "./Services/get-elements";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "documents") {
    // Get the array of texts from the response
    const textArray = request.textArray;

    // Inject a script into the page to modify the style
    chrome.tabs.executeScript(
      {
        code: `
        
        const textArray = ${JSON.stringify(textArray)};
        const elements = document.querySelectorAll('p');

        elements.forEach((element, index) => {
          
          if (index < textArray.length) {
            const words = textArray[index].text.split(' ');

            
            const halfLength = Math.ceil(words.length / 2);
            const firstHalf = words.slice(0, halfLength).join(' ');
            const secondHalf = words.slice(halfLength).join(' ');

            element.innerHTML = '<b>' + firstHalf + '</b>' + ' ' + secondHalf;
          }
        });
        chrome.runtime.sendMessage({ type: "contentScriptComplete" });
      `,
      },
      () => {
        return true;
      }
    );

    // if (request["type"] == "documents") {
    //   let elements = myCal();
    //   elements = Array.from(elements);
    //   // let pArray = [];
    //   // elements?.map((e, i) => {
    //   //   let x = { index: i, text: e.innerText };
    //   //   pArray.push(x);
    //   // });

    //   // console.log("Content sending response:", pArray);

    //   // setTimeout(() => {
    //   //   sendResponse(pArray);
    //   // }, 0); // this is how you send message to popup

    //   elements?.forEach((e, i) => {
    //     e.style.fontWeight = "bold !important";
    //   });

    //   setTimeout(() => {
    //     sendResponse({ success: true });
    //   }, 0);
    // }
    // sendResponse({ success: true });
    return true; // this make sure sendResponse will work asynchronously
  }
});
