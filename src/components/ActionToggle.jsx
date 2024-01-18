import React, { useEffect, useState } from "react";

export const ActionToggle = () => {
  const [isChecked, setChecked] = useState(false);

  const actionToggle = () => {
    setChecked(!isChecked);
    // console.log("action toggle clicked")
    // Send a message to content.js with the type and checked status
    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
      chrome.tabs.sendMessage(activeTabs[0].id, {
        type: "documents",
        action: "toggle",
        checked: !isChecked,
      });
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
      chrome.tabs.sendMessage(activeTabs[0].id, {
        type: "flagCheck"
      }, (response)=>{
        console.log('response:',response);
        setChecked(response)
      });
    });
  }, [])

  return (
    <>
      <input
        onClick={actionToggle}
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={() => { }}
      />
      <label htmlFor="switch">Toggle</label>
    </>
  );
};
