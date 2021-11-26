import React, {useEffect, useState} from 'react';
import {CommonPageContainer} from "../libs/CommonStyle";
import styled from "styled-components";
import {Button, Card, Input, message} from "antd";
import {httpMessageExecute} from "../libs/HttpErrorMessage";
import {useNavigate} from "react-router-dom";
import {useFirebaseLogin} from "../hooks/useFirebaseLogin";

const LoginPageContainer = styled(CommonPageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginPageHeader = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const { TextArea } = Input;

const LoginPage = () => {
    const { firebaseLogin, dbConnResult } = useFirebaseLogin()
    const [loginForm, setLoginForm] = useState('')
    const navigate = useNavigate()

    const onLoginButtonPressed = () => {
        try {
            firebaseLogin(loginForm)
        } catch(ex) {
            message.error("키 형태에 오류가 있습니다.")
        }
    }

    useEffect(() => {
        if(dbConnResult === 1) {
            httpMessageExecute(200, "로그인 되었습니다.")
            navigate("/console")
        } else if(dbConnResult === -1) {
            httpMessageExecute(401)
        }
    }, [dbConnResult, navigate])


    return (
        <LoginPageContainer>
            <Card>
                <LoginPageHeader>관리자 로그인</LoginPageHeader>
                <p>Firebase 인증 정보를 입력하여 관리자 콘솔에 접속하십시오.</p>
                <TextArea
                    rows={10} style={{ width: 650, resize: "none" }}
                    placeholder="여기에 인증 정보를 입력하세요."
                    onChange={(e) => setLoginForm(e.target.value)}
                    value={loginForm} />

                <br /><br />
                <ButtonContainer>
                    <Button type="primary" style={{ width: 220 }} onClick={onLoginButtonPressed}>로그인</Button>
                    <div style={{ flex: 1 }} />
                </ButtonContainer>
            </Card>
        </LoginPageContainer>
    );
};

export default LoginPage;