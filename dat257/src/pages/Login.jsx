import React, {useEffect, useState} from "react";
import LoginBtn from "../js/LoginBtn";
import axios from "axios";
function Login({onUserChange},{userID}) {

    return (
        <div>
            <LoginBtn onUserChange={onUserChange}/>
        </div>
    )
}

export default Login