import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Blocks from "./Blocks";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;