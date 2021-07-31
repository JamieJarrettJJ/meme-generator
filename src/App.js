import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme";
import { Swiper, SwiperSlide } from "swiper/react";

import "./App.css";

import "swiper/swiper.min.css";
import "swiper/components/effect-flip/effect-flip.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { EffectFlip, Navigation } from "swiper/core";

SwiperCore.use([EffectFlip, Navigation]);

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((x) =>
      x.json().then((response) => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <>
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
        <div style={{ textAlign: "center" }}>
          <img
            style={{ width: 600, marginTop: "50px" }}
            src={meme}
            alt="Custom Meme"
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a className="navbar-brand" href="/meme-generator">
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
      <h1 style={{ marginTop: "0px" }}>Click on your favourite meme</h1>
      <div className="memes" style={{ textAlign: "center" }}>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          flipEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={true}
          className="mySwiper"
        >
          {template && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const params = {
                  template_id: template.id,
                  text0: topText,
                  text1: bottomText,
                  username: "Ls2Bvb6fko",
                  password: "R6z2oj4o9Z",
                };
                const response = await fetch(
                  `https://api.imgflip.com/caption_image${objectToQueryParam(
                    params
                  )}`
                );
                const json = await response.json();
                console.log(json);
                setMeme(json.data.url);
              }}
            >
              <div className="textInput">
                <Meme template={template} />
                <input
                  style={{ marginTop: "70px" }}
                  placeholder="top text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                />
                <input
                  placeholder="bottom text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                />
                <br></br>
                <button type="submit">Generate Meme</button>
              </div>
            </form>
          )}
          {!template &&
            templates.map((template) => {
              return (
                <SwiperSlide>
                  <Meme
                    template={template}
                    onClick={() => {
                      setTemplate(template);
                    }}
                  ></Meme>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
