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

  return (
    <div className="App" data-testid="app">
      <section className="content">
        <img className="graphic" src={graphicSrc} alt="Graphic" />
        <h1>ADHD Bionic Mode</h1>
        <p>{tab?.id}</p>
        <p>Bionic mode for reader with ADHD. This extension helps users to keep focus.</p>
        <ActionToggle />
        <span>
          Scripts Version: {process.env.VERSION} / Build: {process.env.BUILD}
        </span>
      </section>
    </div>
  );
};

export default App;

if (module.hot) module.hot.accept();
