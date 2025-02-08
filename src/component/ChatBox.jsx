import React, { useState, useEffect, Fragment, useRef } from "react";
import ReactMarkdown from "react-markdown";
import SendIcon from "../assets/Vector.png";
import DocBot from "../assets/docbot-logo.png";
import { getApiDocs } from "../ai";

function ChatBox() {
  const [request, setRequest] = useState("");
  const [aiResponse, setAiResponse] = useState([]);
  const [userMessages, setUserMessages] = useState([]); 
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const textarea = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = textarea.current;
    const formData = new FormData(formElement);
    const formInfo = formData.get("request").trim();

    if (formInfo === "") {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 3000);
      return;
    }

    setRequest(formInfo); 
    setUserMessages((prev) => [...prev, formInfo]); 
    formElement.reset();
  }

  useEffect(() => {
    if (!request) return;

    async function getApi() {
      setLoading(true);
      setAiResponse((prev) => [...prev, "Fetching..."]); 

      try {
        const response = await getApiDocs(request);
        setLoading(false);

        
        setAiResponse((prev) => [...prev.slice(0, -1), ""]);
        typeResponse(response);
      } catch (error) {
        setAiResponse((prev) => [...prev.slice(0, -1), "Error fetching data!"]);
        setLoading(false);
      }
    }

    getApi();
  }, [request]);

const typeResponse = (text) => {
  if (!text) return; 

  let i = 0;

  setAiResponse([""]); 

  const interval = setInterval(() => {
    setAiResponse((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [""]; 
      const lastResponse = safePrev[safePrev.length - 1] || ""; 
      return [...safePrev.slice(0, -1), lastResponse + (text[i] || "")]; 
    });

    i++;
    if (i >= text.length) clearInterval(interval);
  }, 20);
};


  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  /*
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [userMessages, aiResponse]); */

  useEffect(() => {
    if (ref.current) {
      const chatBox = ref.current;

      const isAtBottom =
        chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;

      if (isAtBottom) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }
  }, [request, aiResponse]);

  return (
    <section className="main">
      <div className="chats-container" ref={ref}>
        {userMessages.map((msg, index) => (
          <Fragment key={index}>
            <div className="message my-request">
              <i className="bi bi-person-circle icon"></i>
              <div className="my-request">
                <div>{msg}</div>
              </div>
            </div>

            {aiResponse[index] && (
              <div className="message ai-response" key={index}>
                <img src={DocBot} className="icons" />
                <ReactMarkdown className="ai-response">
                  {aiResponse[index]}
                </ReactMarkdown>
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
          
        </div>
      </div>
    </section>
  );
}


export default ChatBox;

