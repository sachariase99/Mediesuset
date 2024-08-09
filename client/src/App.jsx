import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import User from "./components/user";
import Start from "./components/start";
import Home from "./components/home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Start} />
          <Route path="/home" Component={Home} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/user" Component={User} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
