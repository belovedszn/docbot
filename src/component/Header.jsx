import React from "react";
import { useState, useEffect } from "react";
import DocBot from "../assets/docbot-logo.png";
import { Link } from "react-router-dom";

function Header() {

  const [online, setOnline] = useState(navigator.onLine)

  useEffect(function() {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    };
  }, [])

  
  return (
    <header>
      <nav>
        <Link to=".." relative="path" className="left-arena">
          <i class="bi bi-chevron-left bi-header-icon"></i>
        </Link>

        <div className="center">
          <div className="center-img">
            <img src={DocBot} alt="" />
          </div>
          <div className="state">
            <span className="docbot">DocBot AI</span>
            <div className={online ? "active-state green-dot" : "active-state black-dot"}>
              <span className={online ? "green-dot" : "black-dot"}></span>
              <span className="online">{online ? "online" : "offline"}</span>
            </div>
          </div>
        </div>

        <Link to="/info" relative="path" className="right">
          <i class="bi bi-three-dots-vertical bi-header-icon"></i>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

