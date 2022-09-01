import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PetProfile from "./components/PetProfile";
import GeneralContext from "./contexts/CreateContext";
import { useEffect, useState } from "react";
import AddPet from "./components/AddPet";
import UserProfile from "./components/UserProfile";
import PrivateRoute from "./PrivateRoute";
import MyPets from "./components/MyPets";
import axios from "axios";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [petsList, setPetsList] = useState([]);
  const [petCard, setPetCard] = useState([]);
  const [favPetsList, setFavPetsList] = useState([]);
  const [adoptedFosteredList, setAdoptedFosteredList] = useState([]);
  const [profileId, setProfileId] = useState({});
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState(user?.user);
 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
    }
    
  }, []);

  useEffect(() => {
    if (token) {
      fetchFavPetsList();
      fetchFosteredAdoptedPets();
    } // eslint-disable-next-line
  }, [token]);

  async function fetchFavPetsList() {
    try {
      const favPet = await axios.get("http://localhost:8000/users/getfavpets", {
        headers: { authorization: "Bearer " + token },
      });
      setFavPetsList(favPet.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addFavouritePet(pet) {
    setFavPetsList((prev) => [...prev, pet]);
  }

  async function removeFavouritePet(id) {
    const index = favPetsList.findIndex((pet) => pet._id === id);
    setFavPetsList((prev) => {
      prev.splice(index, 1); 
      return prev;
    });
  }

  
  async function fetchFosteredAdoptedPets() {
    try {
      const res = await axios.get(
        "http://localhost:8000/pets/getadoptedfosteredpets",
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setAdoptedFosteredList(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <BrowserRouter>
        <GeneralContext.Provider
          value={{
            profileId,
            userName,
            setUserName,
            setProfileId,
            petsList,
            setPetsList,
            token,
            setToken,
            fullName,
            setFullName,
            setPetCard,
            petCard,
            error,
            setError,
            user,
            favPetsList,
            fetchFavPetsList,
            addFavouritePet,
            removeFavouritePet,
            adoptedFosteredList,
            setAdoptedFosteredList,
            fetchFosteredAdoptedPets,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" to="/" element={<Home />} />
            <Route path="/search" to="/search" element={<Search />} />
            <Route
              path="/addpet"
              to="/addpet"
              element={
                <PrivateRoute>
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypets"
              to="/mypets"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              to="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/petprofile/:id"
              to="/petprofile"
              element={<PetProfile />}
            />
          </Routes>
        </GeneralContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
