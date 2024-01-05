import { myCal } from "../Services/get-elements";
export const ActionToggle = () => {

  const actionToggle = ()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "documents" }, function (response) {
        console.log("response:", response);

      });
    });
  }
  return (
    <>
      <input onClick={actionToggle} type="checkbox" id="switch" />
      <label for="switch">Toggle</label>
    </>
  );
};
