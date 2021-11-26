import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {useFirebaseLogin} from "../hooks/useFirebaseLogin";

const Header = styled.header`
  height: 54px;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 1px 4px #eaeaea;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const HeaderTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  font-family: 'Noto Sans KR', sans-serif;
  color: #3b3b3b;
  padding: 0;
  margin: 0;
`

const HeaderComp = () => {
    const { getConfigFromStorage } = useFirebaseLogin()

    return (
        <Header>
            <HeaderContainer className="container">
                <Link to={getConfigFromStorage() ? "/console" : "/"} style={{ textDecoration: "none" }}>
                    <HeaderTitle>(주) 이오 관리 콘솔</HeaderTitle>
                </Link>
            </HeaderContainer>
        </Header>
    );
};

export default HeaderComp;