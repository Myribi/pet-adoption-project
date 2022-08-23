import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PetProfile from "./components/PetProfile";
import GeneralContext from "./contexts/CreateContext";
import { useEffect, useState } from "react";


function App() {
  const [petsList, setPetsList] = useState([]);
  const [petCard, setPetCard] = useState([]);
  const [fullName, setFullName] = useState("");
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if(token) {
      setToken(token)
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
     
        <GeneralContext.Provider value={{petsList,setPetsList, token, setToken, fullName, setFullName, setPetCard,petCard}}>
        <NavBar />
        <Routes>
          <Route path="/" to="/" element={<Home/>} />
          <Route path="/search" to="/search" element={<Search/>} />
          <Route path="/petprofile/:id" to="/petprofile" element={<PetProfile/>} />
        </Routes>
        </GeneralContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
