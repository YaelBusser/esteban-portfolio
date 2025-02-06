import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "../pages/Home";
import BashHome from "../components/Bashs/BashHome/index.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path={""} element={<BashHome/>}/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;