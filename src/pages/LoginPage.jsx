import React, {useEffect, useState} from 'react';
import {CommonPageContainer} from "../libs/CommonStyle";
import styled from "styled-components";
import {Button, Card, Checkbox, Input, message} from "antd";
import initializeFirebase from "../libs/Firebase";
import useBoard from "../hooks/useBoard";
import {httpMessageExecute} from "../libs/HttpErrorMessage";
import {useNavigate} from "react-router-dom";

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
    const { board, readPosts, resetBoard } = useBoard()
    const [loginForm, setLoginForm] = useState({
        config: "",
        keepLogin: false
    })
    const navigate = useNavigate()

    const onLoginButtonPressed = () => {
        try {
            initializeFirebase(JSON.parse(loginForm.config))        // Firebase 를 초기화하고
            readPosts("news")
        } catch(ex) {
            message.error("인증 정보가 잘못되었습니다.")
            console.log(ex)
        }
    }

    useEffect(() => {
        httpMessageExecute(board.read.code, "로그인 되었습니다.")
        resetBoard()

        if(board.read.code === 200) {
            navigate("/console")
        }
    }, [board.read.code, navigate, resetBoard])


    return (
        <LoginPageContainer>
            <Card>
                <LoginPageHeader>관리자 로그인</LoginPageHeader>
                <p>Firebase 인증 정보를 입력하여 관리자 콘솔에 접속하십시오.</p>
                <TextArea
                    rows={10} style={{ width: 650, resize: "none" }}
                    placeholder="여기에 인증 정보를 입력하세요."
                    onChange={(e) => setLoginForm({ ...loginForm, config: e.target.value })}
                    value={loginForm.config} />

                <br /><br />
                <ButtonContainer>
                    <Button type="primary" style={{ width: 220 }} onClick={onLoginButtonPressed}>로그인</Button>
                    <div style={{ flex: 1 }} />
                    <Checkbox
                        onChange={(e) => setLoginForm({ ...loginForm, keepLogin: e.target.checked })}
                        checked={loginForm.keepLogin}>
                        로그인 상태 유지
                    </Checkbox>
                </ButtonContainer>
            </Card>
        </LoginPageContainer>
    );
};

export default LoginPage;