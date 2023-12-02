import Navbar from "./components/Navbar"
import Album from "./components/Album"
import DetailView from "./components/DetailView"
import CreatePost from "./components/CreatePost/CreatePost"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/*" element={<SignIn />} />
        <Route path="/prf" element={<Profile />} />
        <Route path="/New User" element={<SignUp />} />
        <Route path="/album" element={<Album />} />
        <Route path="/detail/album" element={<Album />} />
        <Route path="/detail/:listingId" element={<DetailView />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/detail/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
