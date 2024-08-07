import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" Component={LoginPage}/>
          <Route path="/register" Component={RegisterPage}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
