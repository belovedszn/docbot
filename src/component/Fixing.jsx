/* import React from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import SendIcon from "../assets/Vector.png";
import DocBot from "../assets/docbot-logo.png";

import { getApiDocs } from "../ai";

function ChatBox() {
  const [request, setRequest] = useState([]);
  const [aiResponse, setAiResponse] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const textarea = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    //const formElement = event.currentTarget;
    const formElement = textarea.current;
    const formData = new FormData(formElement);
    const formInfo = formData.get("request").trim();

    if (formInfo === "") {
      setEmpty(true);

      setTimeout(() => {
        setEmpty(false);
      }, 3000);

      return;
    }

    setRequest(function (prev) {
      return [...prev, formInfo];
    });

    /*setTimeout(() => {
      const aiRes = `I received: "${formInfo}"`;

      setAiResponse((prev) => [...prev, aiRes]);
    }, 1000); /

    formElement.reset();
  }  

  
 /* useEffect(() => {
    async function getApi() {
      const response = await getApiDocs(request);
      //setAiResponse(response);
      setAiResponse((prev) => [...prev, response]);
      setLoading(true)
    }
    getApi();
  }, []); /

  useEffect(() => {
    async function getApi() {
      setLoading(true);
      setAiResponse((prev) => [...prev, "typing..."]); // Show Typing...

      const response = await getApiDocs(request);
      setLoading(false);

      // Remove "Typing..." and add empty string for typing effect
      setAiResponse((prev) => [...prev.slice(0, -1), ""]);
      typeResponse(response);
    }

    getApi();
  }, [request]);

  const typeResponse = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse((prev) => {
        const lastResponse = prev[prev.length - 1] || "";
        return [...prev.slice(0, -1), lastResponse + text[i]];
      });
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50); // Adjust speed as needed
  };

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      handleSubmit(event); // Calls the form submission function
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [request, aiResponse]);

  const loadingEffect = loading === true ? <div>Typing...</div> : null;


  return (
    <section className="main">
      <div className="chats-container" ref={ref}>
        {request.map((msg, index) => (
          <Fragment key={index}>
            <div className="message my-request">
              <i className="bi bi-person-circle icon"></i>
              <div className="my-request">
                <div>{msg}</div>
              </div>
            </div>

            {aiResponse[index] && (
              <div className="message ai-response regenerated" key={index}>
                <img src={DocBot} className="icons" />
                <div className="ai-response">{aiResponse[index]}</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="main-chatting-section">
        <div className="chatbox">
          {empty && (
            <div className="empty-chatbox">
              <div>
                <span>Please Enter Something...</span>
              </div>
            </div>
          )}

          <div className="chatbox-bot">
            <form onSubmit={handleSubmit} ref={textarea}>
              <textarea
                name="request"
                id="request"
                autoFocus
                onKeyDown={handleKeyDown}
                placeholder="Enter an endpoint to proceed..."
              />
              <button type="submit" className="btn">
                <img src={SendIcon} />
              </button>
            </form>
          </div>
          <div className="dev">
            <span>
              Contact <a href="">Dev</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;

/**
 * 
 * <input
                type="text"
                placeholder="Enter your endpoint to proceed..."
                name="request"
                autoComplete="off"
                autoFocus
              />
 * 
 * {request.map((msg, index) => {
              return <div key={index}>{msg}</div>;
            })}

            https://jsonplaceholder.typicode.com/posts/19

 */

              /* const typeResponse = (text) => {
                let i = 0;
                const interval = setInterval(() => {
                  setAiResponse((prev) => {
                    const lastResponse = prev[prev.length - 1] || "";
                    return [...prev.slice(0, -1), lastResponse + text[i]];
                  });
                  setTextFunction(fullText.slice(0, i + 1)); // Get only the needed substring
                  i++;
                  if (i >= text.length) clearInterval(interval);
                }, 50);
              }; */
            
             /* const typeResponse = (text) => {
                let cleanedText = text.replace(/undefined$/, ""); // Remove "undefined" at the end
                let i = 0;
                const interval = setInterval(() => {
                  setAiResponse((prev) => {
                    const lastResponse = prev[prev.length - 1] || "";
                    return [...prev.slice(0, -1), lastResponse + cleanedText[i]];
                  });
                  i++;
                  if (i >= cleanedText.length) clearInterval(interval);
                }, 20);
              }; */
            
             /* const typeResponse = (text) => {
                let i = 0;
                const interval = setInterval(() => {
                  setAiResponse((prev) => {
                    const lastResponse = prev[prev.length - 1] || "";
                    return [...prev.slice(0, -1), lastResponse + text[i]];
                  });
                  i++;
                  if (i >= text.length) clearInterval(interval);
                }, 20); 
              };
            */
            