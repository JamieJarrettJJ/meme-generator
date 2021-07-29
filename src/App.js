import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme";

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((x) =>
      x.json().then((response) => setTemplates(response.data.memes))
    );
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a className="navbar-brand" href="/">
          <b>7 Days, 7 Projects - Meme Generator (Day 3/7)</b>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://jj1.dev/projects">
                More Projects
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="memes" style={{ textAlign: "center" }}>
        {template && <Meme template={template} />}
        {!template &&
          templates.map((template) => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
