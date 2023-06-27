import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import MajorRequirements from './pages/majorRequirements';
import AppNavbar from './nav/AppNavbar';
import GPACalculatorPage from './pages/GPACalculatorPage';
import NewCalendar from './pages/NewCalendar';
import ScheduleDragNDrop from './pages/ScheduleDragNDrop';
import { getCurrentUser } from './utils/currentUser';
import { useState } from 'react';

import userService from './services/user.service';

function App() {

    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const navigate = useNavigate();

    function logoutAndRouteToStart() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setCurrentUser(getCurrentUser());
        navigate("/");
    }

    userService.logoutAndRouteToStart = logoutAndRouteToStart;

    return (
        <div>
                <AppNavbar currentUser={currentUser} setCurrentUser={setCurrentUser}></AppNavbar>
                <Routes>
                    <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                    <Route path="/majorrequirements" element={<MajorRequirements />} />
                    <Route path="/GPACalculatorPage" element={<GPACalculatorPage />} />
                    <Route path="/schedule" element={<NewCalendar />} />
                    <Route path='/schedulechanger' element={<ScheduleDragNDrop />} />
                </Routes>
        </div>
    );
}

export default App;
