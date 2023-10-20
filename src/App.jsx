import Navbar from "./components/Navbar"
import Album from "./components/Album"
import DetailView from "./components/DetailView"
import CreatePost from "./components/CreatePost/CreatePost"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Album />} />
        <Route path="/detail/:listingId" element={<DetailView />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
