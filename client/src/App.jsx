import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import User from "./components/user";
import Home from "./components/home";
import Navbar from "./components/navbar";
import { LoadingProvider } from "./context/loadingContext";

function App() {
  return (
    <LoadingProvider>
      <div className="">
      <Router>
          <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/user" Component={User} />
        </Routes>
      </Router>
    </div>
    </LoadingProvider>
  );
}

export default App;
