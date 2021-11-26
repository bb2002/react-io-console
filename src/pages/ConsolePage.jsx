import React from 'react';
import {Route, Routes} from "react-router-dom";
import ConsoleMain from "./console/ConsoleMain";
import BoardList from "./console/BoardList";
import BoardWrite from "./console/BoardWrite";

const ConsolePage = () => {
    return (
        <div className="container">
            <br />
            <Routes>
                <Route path="/" element={<ConsoleMain />} />
                <Route path="/list/:category" element={<BoardList />} />
                <Route path="/write/:category" element={<BoardWrite />} />
            </Routes>
        </div>
    );
};

export default ConsolePage;