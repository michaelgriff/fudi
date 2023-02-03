import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import Signup from "./pages/Signup";
import Restaurants from "./pages/Restaurants";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
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
