import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import {Button, Card, PageHeader, Spin} from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components"
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #e8e8e8;
  margin-top: 36px;
  margin-bottom: 36px;
`

const WriteDateText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  color: #7a7a7a;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const BoardRead = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { board, readPosts } = useBoard()
    const [post, setPost] = useState(undefined)

    useEffect(() => {
        if(board.read.code === 0) {
            // 아직 board 를 읽은 적이 없음.
            readPosts(params.category)
        }
    }, [readPosts, board.read.code, params.category, params.no])

    useEffect(() => {
        const tPost = board.read.data[params.category].filter(value => value.no === params.no)[0]
        setPost(tPost)
    }, [params.category, params.no, board.read.data])

    console.log(post)

    if(post === undefined) {
        return <Spin />
    } else {
        return (
            <div>
                <Card bodyStyle={{ padding: 8 }} style={{ marginBottom: 36 }}>
                    <PageHeader
                        title={`${params.category.toUpperCase()} 게시판`}
                        subTitle={`${params.no} 글`}
                        onBack={() => navigate(`/console/list/${params.category}`)}/>
                </Card>

                <Title level={1}>{post.title}</Title>
                <WriteDateText>작성날짜: {post.createdAt.format("YYYY-MM-DD HH:mm:ss")}</WriteDateText>
                <Divider />
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
                <Divider />

                <ButtonContainer>
                    <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 8 }}>글 수정</Button>
                    <Button type="default" danger={true} icon={<DeleteOutlined />}>글 삭제</Button>
                </ButtonContainer>
            </div>
        );
    }

};

export default BoardRead;