import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FiltersPage from "./pages/FiltersPage";
import LikeDislikePage from "./pages/LikeDislikePage";
import LikesHistoryPage from "./pages/LikesHistoryPage";
import Toolbar from "./components/Toolbar";
import mainContext from "./context/mainContext";
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [users, setUsers] = useState()
  const [photos, setPhotos] = useState([])
  const states = {currentUser, setCurrentUser, users, setUsers, photos, setPhotos}
  function getUsers() {
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include"
      }
      fetch("http://localhost:4000/getUser", options)
          .then(res => res.json())
          .then((data) => {
            setUsers(data.users)
            console.log(data)
          })
  }

  // function getCurrentUser() {
  //   if (!currentUser) {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json"
  //       },
  //       credentials: "include"
  //     }
  //     fetch("http://localhost:4000/currentUser", options)
  //         .then(res => res.json())
  //         .then((data) => {
  //           setCurrentUser(data.user)
  //           console.log(data)
  //         })
  //   }
  // }

  useEffect(() => {
    getUsers()
    // getCurrentUser()
    console.log(currentUser)
  }, [])

  return (
    <div className="App">
      <mainContext.Provider value={states}>
        <BrowserRouter>
          <Toolbar/>
          <Routes>
            <Route path="/register" element={<RegistrationPage/>}/>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/filter" element={<FiltersPage/>}/>
            <Route path="/swipe" element={<LikeDislikePage/>}/>
            <Route path="/history" element={<LikesHistoryPage/>}/>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>

    </div>
  );
}

export default App;
