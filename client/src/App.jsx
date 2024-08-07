import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={LoginPage}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
