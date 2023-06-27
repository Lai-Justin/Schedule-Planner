import React from "react";
import AppNavbar from "../nav/AppNavbar";
import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import { getCurrentUser } from "../utils/currentUser";
import NewUserModal from "../components/NewUserModal/NewUserModal";
import { useEffect } from "react";
import userService from "../services/user.service";
import styles from "./HomePage.module.css";
import ucsbLogo from '../assets/SBLogo.png';
import Scribble from '../assets/Scribble.png';

const HomePage = ({ currentUser, setCurrentUser }) => {

    //const [currentUser, setCurrentUser] = useState(getCurrentUser());

    useEffect(() => {
        //console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    });
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState("User Name"); //on new user login, set this to the user's name
    const confirmMajor = (planner) => {
        //do something with planner
        console.log("THis is planner: ", planner);
        let userData = {
            years:
                [...planner]
        };
        userService.setPlanner(userData);


        setShow(false);
    }
    return (
        <div align="center" className = {styles.divText}>
            <h1>UCSB 4 Year Schedule Planner</h1>
            <h3>CMPSC 148 - Winter 2023</h3>
            <p>Plan out your 4 year schedule at UCSB!</p>
            <p>Created by Christian Schwenger, Justin Lai, Madison Long, Matt Priston, Nathan Hoang, Yash Vangala</p>
            {
                !currentUser.loggedIn && (
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                let URL = process.env.REACT_APP_SERVER_URL + "/api/auth/googleSignin"
                                axios.post(URL, {}, { headers: { "x-access-token": credentialResponse.credential } })
                                    .then(response => {
                                        if (response.status === 200) {
                                            localStorage.setItem("userToken", credentialResponse.credential);
                                            localStorage.setItem("userData", JSON.stringify(response.data));
                                            setCurrentUser(getCurrentUser());
                                            if (response.data.message === "User was registered successfully!") {
                                                setUserName(response.data.firstName);
                                                setShow(true);
                                            }
                                        }
                                        //console.log(response)
                                    });
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </GoogleOAuthProvider>
                    
                )
            }
            <NewUserModal show={show} userName={userName} handleChange={confirmMajor} />
            {/* <img src={ucsbLogo} className = {styles.UCSBLogo} /> */}
            <img src={Scribble} className = {styles.Scribble} />
            {/* <img src={ucsbLogo} styles = {styles.UCSBLogo} /> */}
            <footer>*Image credited to Raaghav Thirumaligai</footer>
        </div>
    );
};

export default HomePage;