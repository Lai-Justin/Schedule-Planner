import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { getCurrentUser } from "../utils/currentUser";
import userService from "../services/user.service";
import styles from "./AppNavbar.module.css";
import calanderPic from '../assets/CartoonCalander.png';

const AppNavbar = ({currentUser, logoutAndRouteToStart}) => {

    //const [currentUser, setCurrentUser] = useState(getCurrentUser());

    useEffect(() => {
        console.log(currentUser);
    },[currentUser])

    return (
        <Navbar className = {styles.navBar}>
            <Container>
            <img src={calanderPic} className = {styles.calanderImage} />
                <Navbar.Brand as={Link} to="/">
                   <b>4YSP</b> 
                </Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse className="justify-content-between">
                    <Nav className="mr-auto">
                        {
                            <>
                            <Nav.Link href='/majorrequirements'> Major Requirements </Nav.Link>
                            {currentUser.loggedIn && <Nav.Link href="/schedulechanger">Schedule Planner</Nav.Link>}
                            {currentUser.loggedIn && <Nav.Link href='/schedule'>Print Schedule</Nav.Link>}
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                    
                {
                    currentUser.loggedIn && (
                        <Button variant="dark" onClick = {() => {
                            userService.logoutAndRouteToStart();
                        }} > 
                            Log Out 
                        </Button>
                    )
                }
            </Container>
        </Navbar>
    );
};
export default AppNavbar;