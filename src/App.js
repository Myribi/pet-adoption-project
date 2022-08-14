import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" to="/" element={<Home/>} />
          <Route path="/search" to="/search" element={<Search/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
