import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Docbot from "../assets/chatbot.png";

function Info() {
  const typeEffect = (fullText, setTextFunction, effect) => {
    let i = 0;
    const interval = setInterval(() => {
      setTextFunction((prev) => prev + fullText[i]);
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        if (effect) effect();
      }
    }, 15);
  };

  return (
    <section>
      <div className="info">
        <Link to="/chats" relative="path" className="go-back-btn">
          {" "}
          <i className="bi bi-chevron-left"></i> Go Back
        </Link>
      </div>
      <div className="details fade-in">
        <div className="write-up">
          <h1>About This Project</h1>
          <h3>DocBot AI</h3>
          <p>
            {" "}
            is a side project built to enables users to enter an API endpoint,
            fetch its documentation, and receive a well structured explanation,
            including available methods, request/response formats,
            authentication requirements, and usage examples. This project was
            created as an experiment to explore my capabilities in React and
            AI-powered API documentation generation
          </p>
          <h3>How It Works </h3>
          <ol className="list">
            <li>Enter an API endpoint into the chatbox</li>
            <li>
              The AI fetches relevant documentation and explains it in a
              structured format
            </li>
            <li>
              The response is displayed in markdown format for easy readability
            </li>
          </ol>
          <h3>Features</h3>
          <ul className="list">
            <li>
              <strong>React Hooks:</strong> Managing state and UI updates
              dynamically
            </li>
            <li>
              <strong>AI Integration:</strong> Using Hugging Face's
              Mistral-Nemo-Instruct-2407 model to generate the API documentation
              explanations
            </li>
            <li>
              <strong>Synchronous Data Handling:</strong> Fetching and
              displaying AI-generated responses in real time
            </li>
            <li> CSS & UI Components for styling and responsiveness</li>
          </ul>
          <div className="dev">
            <span>
              <a target="_blank" href="https://belovedszn.github.io/me/html/index.html">Meet Developer</a>
            </span>
          </div>
        </div>
        <div className="info-img">
          <img src={Docbot} />
        </div>
      </div>
    </section>
  );
}

export default Info;

