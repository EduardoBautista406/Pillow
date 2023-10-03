import { useState } from "react";
import Album from "./components/Album"
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Album/>
      </div>
    </>
  );
}

export default App;
