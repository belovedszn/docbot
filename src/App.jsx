import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./component/Homepage";
import Chats from "./component/Chats";
import Info from "./component/Info";
import Layout from "./component/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="chats" element={<Layout pages={<Chats />} />} />
        <Route path="info" element={<Layout pages={<Info />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
