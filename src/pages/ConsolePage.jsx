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
                <Route exact path="/" element={<ConsoleMain />} />
                <Route exact path="/list/:category" element={<BoardList />} />
                <Route exact path="/write/:category" element={<BoardWrite />} />
            </Routes>
        </div>
    );
};

export default ConsolePage;