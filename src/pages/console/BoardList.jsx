import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import Search from "antd/es/input/Search";
import {Button, Table, Tooltip} from "antd";
import Title from "antd/es/typography/Title";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import styled from "styled-components"

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const BoardList = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { board, readPosts } = useBoard()
    const [data, setData] = useState()
    const [searchText, setSearchText] = useState("")

    const columns = [
        {
            title: "No",
            dataIndex: 'index',
            key: 'index',
            width: 150
        },
        {
            title: "제목",
            dataIndex: 'title',
            key: 'title',
            render: ({ text, no }) => <Link to={`/console/read/${params.category}/${no}`}>{text}</Link>
        },
        {
            title: "날짜",
            dataIndex: 'date',
            key: 'date',
            width: 250
        },
        {
            title: "작업",
            dataIndex: "actions",
            key: "actions",
            width: 100,
            render: (no) => (
                <ActionButtonContainer>
                    <Tooltip title="수정">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/console/edit/${params.category}/${no}`)}/>
                    </Tooltip>
                    <Tooltip title="삭제">
                        <Button type="primary" danger={true} shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                </ActionButtonContainer>
            )
        }
    ]

    useEffect(() => {
        if(board.read.code === 200) {
            const bData = board.read.data[params.category]

            setData(
                bData.map((value, index) => ({
                    index: bData.length - index,
                    title: {
                        text: value.title,
                        no: value.no
                    },                                 // 제목
                    date: value.createdAt.format("MM/DD HH:mm"),        // 날짜
                    actions: value.no,
                })).filter(value => value.title.text.indexOf(searchText) !== -1)
            )
        }

        if(board.read.code === 0) {
            // 아직 글을 읽은 기록이 없음.
            readPosts(params.category)
        }
        // readPosts 를 넣으면 무한루프에 빠집니다.
        // eslint-disable-next-line
    }, [board.read, params.category, searchText])

    const onSearch = (value) => {
        setSearchText(value)
    }

    const onTextChanged = (e) => {
        if(e.target.value === "") {
            setSearchText("")
        }
    }

    return (
        <div>
            <Title level={2}>게시판 {params.category}의 목록</Title>
            <div style={{ height: 64 }} />
            <Search placeholder="검색어를 입력하세요." onSearch={onSearch} style={{ width: 250, marginBottom: 32 }} onChange={onTextChanged} />
            <Table columns={columns} dataSource={data} loading={board.loading} />
        </div>
    );
};

export default BoardList;