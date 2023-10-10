import { useState } from "react";
import Album from "./components/Album"
import DetailView from "./components/DetailView"
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Pillow
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/*" element={<Album />} />
        <Route path="/detail" element={<DetailView />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
