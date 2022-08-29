import {useContext, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import mainContext from "../context/mainContext";

const Toolbar = () => {
    const {currentUser, setCurrentUser, socket} = useContext(mainContext)
    const nav = useNavigate()

    function logout() {
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
        }

        fetch('http://localhost:4000/profile', options)
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data.user)
                socket.disconnect()
                socket.connect()
            })
        nav("/")
    }

    return (
        <div>
            <div className="toolbarWrapper">
                {!currentUser ?
                    <div className="loggedOut-toolbarWrapper">
                        <Link to="/">Login</Link>
                        <Link to="Register">Register</Link>
                    </div> :
                    <div className="loggedIn-toolbarWrapper">
                        <Link to="/profile">Profile</Link>
                        <Link to="/filter">Filter</Link>
                        <Link to="/swipe">Swipe</Link>
                        <Link to="/history">Matches</Link>
                    </div>
                }
                <button className="logoutBtn" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Toolbar;