import React, { useState } from "react";

export const ActionToggle = () => {
  const [isChecked, setChecked] = useState(false);

  const actionToggle = () => {
    setChecked(!isChecked);

    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs, response) {
      chrome.tabs.sendMessage(activeTabs[0].id, { type: "documents" }, function (response) {
        console.log("response:", response);
      });
    });
  };
  return (
    <>
      <input
        onClick={actionToggle}
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={() => {}}
      />
      <label htmlFor="switch">Toggle</label>
    </>
  );
};
