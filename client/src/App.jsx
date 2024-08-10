import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import User from "./components/user";
import Start from "./components/start";
import Home from "./components/home";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="bg-[#3A0956] h-[100vh]">
      <Router>
        <div className="py-8">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" Component={Start} />
          <Route path="/home" Component={Home} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/user" Component={User} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
