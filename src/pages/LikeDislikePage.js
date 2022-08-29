import React, {useContext, useEffect} from 'react';
import mainContext from "../context/mainContext";


const LikeDislikePage = () => {
const {users} = useContext(mainContext)

    useEffect(() => {
        console.log(users)
    }, [])

    return (
        <div>

        </div>
    );
};

export default LikeDislikePage;