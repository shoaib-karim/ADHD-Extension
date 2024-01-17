import React, { useEffect, useState } from "react";
import { ActionToggle } from "./components/ActionToggle";
import graphicSrc from "./images/icon.png";
import "./css/index.css";

const App = () => {
  const [tab, setTab] = useState(null);
  let queryOptions = { active: true, currentWindow: true };
  const [messageFromContent, setMessageFromContent] = useState("");

  useEffect(() => {
    // console.log("messageFromContent:", messageFromContent);
  }, [messageFromContent]);

  // Function to handle link click and open in a new tab
  const handleLinkClick = () => {
    chrome.tabs.create({
      url: "https://www.clinical-partners.co.uk/for-adults/adult-adhd-add/test-for-adhd",
    });
  };

  return (
    <div className="App" data-testid="app">
      <section className="content">
        <img className="graphic" src={graphicSrc} alt="Graphic" />
        <h1>ADHD Bionic Mode</h1>
        <p>{tab?.id}</p>
        <p>
          Bionic mode for reader with ADHD. This extension helps users to keep focus while reading
          blogs in the internet.
        </p>
        <ActionToggle />
        <span>
          Do you have ADHD? Diagnose by yourself here:
          <br />{" "}
          <a href="#" onClick={handleLinkClick} id="spanLink">
            Clinical Partners
          </a>
        </span>
      </section>
    </div>
  );
};

export default App;

if (module.hot) module.hot.accept();
