import React from 'react';
import {Route, Routes} from "react-router-dom";
import ConsoleMain from "./console/ConsoleMain";

const ConsolePage = () => {
    return (
        <div className="container">
            <br />
            <Routes>
                <Route exact path="/" element={<ConsoleMain />} />
            </Routes>
        </div>
    );
};

export default ConsolePage;