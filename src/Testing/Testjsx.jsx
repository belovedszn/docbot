import React, { useState } from "react";

const ChatBot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [empty, setEmpty] = useState(false);

  const handleUserInput = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const userMessage = formData.get("request").trim();

    if (userMessage === "") {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 3000);
      return;
    }

    // Add user message to state
    setUserMessages((prev) => [...prev, userMessage]);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = `I received: "${userMessage}"`;
      setAiMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    // Reset input field
    formElement.reset();
  };

  return (
    <div className="chatbot">
      <div className="chat-box">
        {userMessages.map((msg, index) => (
          <React.Fragment key={index}>
            <div className="user-message">
              <strong>You:</strong> {msg}
            </div>
            {aiMessages[index] && (
              <div className="ai-message">
                <strong>AI:</strong> {aiMessages[index]}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {empty && <div className="error">Please enter a message.</div>}

      <form onSubmit={handleUserInput} className="chat-input">
        <input type="text" name="request" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;


/*import React, { useState } from 'react';

const ChatBot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);

  const handleUserInput = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.userInput.value;

    // Add user input to the state
    setUserMessages([...userMessages, userInput]);

    // Simulate AI response
    const aiResponse = `AI: You said "${userInput}"`;

    // Add AI response to the state
    setAiMessages([...aiMessages, aiResponse]);

    // Clear input field
    e.target.elements.userInput.value = '';
  };

  return (
    <div className="chatbot">
      <div className="chat-box">
        {}
        <div className="user-messages">
          {userMessages.map((msg, index) => (
            <div key={index} className="user-message">
              <strong>You:</strong> {msg}
            </div>
          ))}
        </div>

        {}
        <div className="ai-messages">
          {aiMessages.map((msg, index) => (
            <div key={index} className="ai-message">
              <strong>{msg}</strong>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleUserInput} className="chat-input">
        <input
          type="text"
          name="userInput"
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;


/**
 * import React, { useState } from "react";
import SendIcon from "../assets/Vector.png";
import DocBot from "../assets/docbot-logo.png";

function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Hi, how can I be of service to you?", sender: "ai" },
  ]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const userMessage = formData.get("request").trim();

    if (!userMessage) return; // Prevent empty messages

    // Add user message to chat
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);

    formElement.reset();

    try {
      // Simulate API call (Replace this with actual API request)
      const aiResponse = await fetchAIResponse(userMessage);

      // Add AI response to chat
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }

  // Simulated API call (Replace this with your actual API function)
  async function fetchAIResponse(userInput) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI Response to: ${userInput}`); // Placeholder AI response
      }, 1000);
    });
  }

  const chatsElement = messages.map((msg, index) => (
    <div
      key={index}
      className={`message ${
        msg.sender === "user" ? "my-request" : "ai-response"
      }`}
    >
      <div className="message-text">{msg.text}</div>
      {msg.sender === "user" ? (
        <i className="bi bi-person-circle icon"></i>
      ) : (
        <img src={DocBot} className="icons" alt="AI Bot" />
      )}
    </div>
  ))

  return (
    <section>
      <div className="chats-container">
        {chatsElement}
      </div>

      <div className="chatbox">
        <div className="chatbox-bot">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your message..."
              name="request"
            />
            <button type="submit" className="btn">
              <img src={SendIcon} alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;

/**
 * import { useState } from "react";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: Unable to connect to AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>AI Chat</h2>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
      {response && <p className="response-box">{response}</p>}
    </div>
  );
};

export default ChatApp;

 */