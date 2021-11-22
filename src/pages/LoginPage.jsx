import React from 'react';
import {CommonPageContainer} from "../libs/CommonStyle";
import styled from "styled-components";
import {Button, Card, Checkbox, Input} from "antd";

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
    return (
        <LoginPageContainer>
            <Card>
                <LoginPageHeader>관리자 로그인</LoginPageHeader>
                <p>Firebase 인증 정보를 입력하여 관리자 콘솔에 접속하십시오.</p>
                <TextArea rows={10} style={{ width: 650, resize: "none" }} placeholder="여기에 인증 정보를 입력하세요."/>

                <br /><br />
                <ButtonContainer>
                    <Button type="primary" style={{ width: 220 }}>로그인</Button>
                    <div style={{ flex: 1 }} />
                    <Checkbox>로그인 상태 유지</Checkbox>
                </ButtonContainer>
            </Card>
        </LoginPageContainer>
    );
};

export default LoginPage;