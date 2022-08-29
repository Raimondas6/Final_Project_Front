import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import mainContext from "../context/mainContext";

const LoginPage = () => {

    const usernameRef = useRef()
    const passRef = useRef()
    const checkBoxRef = useRef()
    const [errorMessage, setErrorMessage] = useState("")
    const nav = useNavigate()
    const {setCurrentUser, socket} = useContext(mainContext)

    function login() {
        if (checkBoxRef.current.checked === true) {
            const user = {
                username: usernameRef.current.value,
                password: passRef.current.value,
                checkBox: checkBoxRef.current.checked,
            }

            const options = {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(user)
            }

            fetch('http://localhost:4000/login', options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setErrorMessage(data.message)
                    if (data.success === true){
                        setCurrentUser(user.username)
                        console.log(data.message)
                        nav("/profile")
                    }
                })
        } else {
            const user = {
                username: usernameRef.current.value,
                password: passRef.current.value,
            }

            const options = {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(user)
            }

            fetch('http://localhost:4000/login', options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setErrorMessage(data.message)
                    if (data.success){
                        setCurrentUser(user.username)
                        nav("/profile")
                    }
                })
        }

    }

    return (
        <div className="login-wrapper">
            <input ref={usernameRef} type="text" placeholder="Username..."/>
            <input ref={passRef} type="text" placeholder="Password..."/>
            <div style={{color: "crimson"}}>{errorMessage}</div>
            <label>
                <input ref={checkBoxRef} type="checkbox" id="stayLogged" name="stayLogged"/>
                Stay logged in
            </label>


            <button onClick={login}>Login</button>
        </div>
    );
};

export default LoginPage;