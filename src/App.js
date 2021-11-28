import React, {useEffect} from "react";
import HeaderComp from "./components/Header.comp";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components"
import LoginPage from "./pages/LoginPage";
import ConsolePage from "./pages/ConsolePage";
import {useFirebaseLogin} from "./hooks/useFirebaseLogin";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`

function App() {
    const { getConfigFromStorage, firebaseLogin } = useFirebaseLogin()
    const navigate = useNavigate()
    const location = useLocation()

    const RouteContainer = styled.div`
      width: 100%;
      height: 100vh;
    `
    
    useEffect(() => {
        const config = getConfigFromStorage()
        if(config) {
            // 자동 로그인
            firebaseLogin(getConfigFromStorage())
            if(location.pathname === "/") {
                navigate("/console")
            }
        }
    }, [firebaseLogin, getConfigFromStorage, location.pathname, navigate])

    return (
        <AppContainer>
            <HeaderComp />

            <RouteContainer>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/console/*" element={<ConsolePage />} />
                </Routes>
            </RouteContainer>
        </AppContainer>
    );
}

export default App;
