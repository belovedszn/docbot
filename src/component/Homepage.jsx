import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Frame from "../assets/Frame.png";
//import { motion, AnimatePresence } from "framer-motion";

function Homepage() {
  const [showTitle, setShowTitle] = useState(false);
  const [text, setText] = useState("");
  const [showImage, setShowImage] = useState(false);
  const ref = useRef(null);
  const shortParagraph = ` Navigating API docs can be time-consuming. DocBot simplifies this by analyzing and summarizing API docs. 
  Simply enter an API endpoint, and it generates a structured breakdown including available methods, 
    request/response formats, authentication requirements, and usage examples. `;

  const paragraph = window.innerWidth < 768 ? shortParagraph : ` As a developer, navigating API documentation can sometimes be time-consuming and complex.
    DocBot can simplifies this process for you by providing an AI-powered tool that helps you analyze,
    summarize, and explain API documentation effortlessly.With our specialized AI assistant, you can enter an API endpoint 
    with a single command prompt, and it will generate a structured explanation, including available methods, 
    request/response formats, authentication requirements, and usage examples. Simply ask our AI assistant for help,
     and it will break down the details in an easy-to-understand format. eg: `;

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
    setTimeout(
      () => typeEffect(paragraph, setText, () => setShowImage(true)),
      1000
    );
  }, []);
  
  const typeEffect = (fullText, setTextFunction, effect) => {
    let i = 0;
    const interval = setInterval(() => {
     // setTextFunction((prev) => prev + fullText[i]);
     setTextFunction(fullText.slice(0, i + 1)); // Get only the needed substring
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        if (effect) effect();
      }
    }, 15);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [text]); // Only scroll when text updates

  return (
    <section className="homepage" ref={ref}>
      {showTitle && <h2 className="fade-in">Your AI Assistant</h2>}

      <span className="reverse">
        <div className="paragraph">
          <p>
            {text}
            {text.length === paragraph.length && (
              <span>
                <a>"https://api.github.com/repos"</a>
              </span>
            )}
          </p>
        </div>

        {showImage && (
          <div className="imgBox fade-in">
            <img src={Frame} alt="Frame" />
          </div>
        )}
      </span>

      {showImage && (
        <Link to="chats" className="continue-btn fade-in">
          <div>
            <span>Continue</span>
          </div>
        </Link>
      )}
    </section>
  );
}

export default Homepage;

/*

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Frame from "../assets/Frame.png";

function Homepage() {
    const [loading, setLoading] = useState()

    const loadingEffect = (effect) => {
        let i = 0;
        const interval = setInterval(() => {
          setLoading((prev) => {
            const lastResponse = prev[prev.length - 1];
            return [...prev.slice(0, -1), lastResponse + effect[i]];
          });
          i++;
          if (i >= effect.length) clearInterval(interval);
        }, 50);
      };

  return (
    <section className="homepage">
      <h2>Your AI Assistant</h2>

      <div className="paragraph">
        <p>
          As a developer using this software, you can kindly ask our artificial
          intelligence assistant to help you analyse, summarize and explain an
          api endpoint with a single command As a developer using this software, you can kindly ask our artificial
          intelligence assistant to help you analyse, summarize and explain an
          api endpoint with a single command As a developer using this software, you can kindly ask our artificial
          intelligence assistant to help you analyse, summarize and explain an
          api endpoint with a single command, eg; <span><a href="">github</a></span>
        </p>
      </div>

      <div className="imgBox">
        <img src={Frame} />
      </div>

      <Link to="chats" className="continue-btn">
        <div>
          <span>Continue</span>
          <i className="bi bi-arrow-right"></i>
        </div>
      </Link>
    </section>
  );
}

export default Homepage;
*/
