import React, {useEffect, useRef, useContext, useState} from 'react';
import mainContext from "../context/mainContext";

const ProfilePage = () => {
    const inp = useRef()
    const {currentUser, setCurrentUser, photos, setPhotos} = useContext(mainContext)
    const [userProfile, setUserProfile] = useState()

    function addPhoto() {
        const userPhoto = {
            photo: inp.current.value
        }

        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userPhoto)
        }

        fetch('http://localhost:4000/uploadPhoto', options)
            .then(res => res.json())
            .then(data => {
                setPhotos(data.photo)
                console.log(data.photo)

            })

    }

    function getCurrentUser() {
        if (!currentUser) {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            }
            fetch("http://localhost:4000/currentUser", options)
                .then(res => res.json())
                .then((data) => {
                    setCurrentUser(data.user)
                    console.log(data)
                })
        }
    }

    useEffect(() => {
        getCurrentUser()
        addPhoto()
        console.log(currentUser)
    }, [])

    return (
        <div className="profile-wrapper">
            <h2>{currentUser}</h2>
            <img src={photos.photo} alt=""/>
            <input ref={inp} type="text" placeholder="Photo Url"/>
            <button onClick={addPhoto}>Upload Photo</button>
            <div>user info</div>
        </div>
    );
};

export default ProfilePage;