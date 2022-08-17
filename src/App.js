import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PetProfile from "./components/PetProfile";
import GeneralContext from "./contexts/CreateContext";
import { useState } from "react";


function App() {
  const [petsList, setPetsList] = useState([]);
  const [currentPet, setCurrentPet] = useState([]);
  
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <GeneralContext.Provider value={{petsList,setPetsList, currentPet, setCurrentPet}}>
        <Routes>
          <Route path="/" to="/" element={<Home/>} />
          <Route path="/search" to="/search" element={<Search/>} />
          <Route path="/petprofile" to="/petprofile" element={<PetProfile/>} />
        </Routes>
        </GeneralContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
