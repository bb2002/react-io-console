import React, {useEffect} from 'react';
import {Button, Card} from "antd";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import useBoard from "../../hooks/useBoard";
import {useNavigate} from "react-router-dom";
import {EditOutlined, UnorderedListOutlined} from "@ant-design/icons";

const ConsoleContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Divider = styled.div`
  width: 16px;
`

const ItemCardP = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ItemCard = ({ title, postLen, listURL, createURL }) => {
    const navigate = useNavigate()

    return (
        <Card type="inner" title={title} style={{ flex: "1" }}>
            <ItemCardP>이 게시판에 글이 <strong>{postLen}개</strong> 등록 됨.</ItemCardP>
            <div style={{ width: "100%", height: 1, backgroundColor: "#ececec", marginTop: 24, marginBottom: 24 }}/>
            <ButtonContainer>
                <Button type="link" onClick={() => navigate(listURL)}><UnorderedListOutlined /> 글 목록</Button>
                <Button type="primary" onClick={() => navigate(createURL)}><EditOutlined /> 글 작성</Button>
            </ButtonContainer>
        </Card>
    )
}

const ConsoleMain = () => {
    const { board, readPosts } = useBoard()

    useEffect(() => {
        readPosts("news")
        readPosts("notice")
        readPosts("recruit")
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Title level={2}>게시판 관리</Title>
            <ConsoleContainer>
                <ItemCard
                    title="공지사항"
                    postLen={board.read.data.notice.length}
                    listURL="/console/list/notice"
                    createURL="/console/write/notice"/>
                <Divider />
                <ItemCard
                    title="보도자료"
                    postLen={board.read.data.news.length}
                    listURL="/console/list/news"
                    createURL="/console/write/news" />
                <Divider />
                <ItemCard
                    title="채용공고"
                    postLen={board.read.data.recruit.length}
                    listURL="/console/list/recruit"
                    createURL="/console/write/recruit" />
            </ConsoleContainer>
            <br /><br /><br /><br />

            <Title level={2}>빠른 이동</Title>

        </div>
    );
};

export default ConsoleMain;