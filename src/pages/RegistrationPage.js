import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'

const RegistrationPage = () => {

    const usernameRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()
    const cityRef = useRef()
    const genderRef = useRef()
    const ageRef = useRef()
    const nav = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    function register() {
        const user = {
            username: usernameRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value,
            city: cityRef.current.value,
            gender: genderRef.current.value,
            age: ageRef.current.value,
        }

        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch('http://localhost:4000/register', options)
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                setErrorMessage(data.message)
                if (data.message === "ok"){
                    usernameRef.current.value = ""
                    passOneRef.current.value = ""
                    passTwoRef.current.value = ""
                    cityRef.current.value = ""
                    genderRef.current.value = ""
                    ageRef.current.value = ""
                    nav("/")
                } else return
            })

    }


    return (
        <div className="register-wrapper">
            <input ref={usernameRef} type="text" placeholder="Username..."/>
            <input ref={passOneRef} type="text" placeholder="Password..."/>
            <input ref={passTwoRef} type="text" placeholder="Password..."/>
            <input ref={cityRef} type="text" placeholder="City..."/>
            <input ref={genderRef} type="text" placeholder="Gender..."/>
            <input ref={ageRef} type="number" placeholder="Age..."/>
            <div style={{color: "crimson"}}>{errorMessage}</div>

            <button onClick={register}>Register</button>
        </div>
    );
};

export default RegistrationPage;