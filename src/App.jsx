import { useState } from "react";
import Album from "./components/Album"
import DetailView from "./components/DetailView"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Album />} />
        <Route path="/detail" element={<DetailView />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
