import React from "react";
import HeaderComp from "./components/Header.comp";
import {Route, Routes} from "react-router-dom";
import styled from "styled-components"
import LoginPage from "./pages/LoginPage";
import {useWindowSize} from "./hooks/useWindowSize";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`

function App() {
    const { height } = useWindowSize()

    const RouteContainer = styled.div`
      width: 100%;
      height: ${height - 54}px;
    `

    return (
        <AppContainer>
            <HeaderComp />

            <RouteContainer>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                </Routes>
            </RouteContainer>
        </AppContainer>
    );
}

export default App;
