import "./App.css";

import { useState } from "react";

import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
    </div>
  );
}

export default App;
