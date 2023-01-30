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

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/restaurants">Restaurants</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to={"/profile" + `/${user.username}`} state={{ user }}>
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate replace to="/home" />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/restaurants"
              element={<Restaurants uuid={user.uuid} />}
            />
            <Route path="/users" element={<Users user={user} />} />
            <Route path="/profile/:id" element={<Profile user={user} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
