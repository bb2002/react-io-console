import React, {useEffect, useState} from 'react';
import {message, PageHeader} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import 'react-quill/dist/quill.snow.css'
import PostEditorComp from "../../components/PostEditor.comp";
import useBoard from "../../hooks/useBoard";
import {httpMessageExecute} from "../../libs/HttpErrorMessage";

const BoardWrite = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { board, writePost, resetBoard } = useBoard()
    const [postForm, setPostForm] = useState({
        title: "",
        content: "",
        files: []
    })

    const handleSubmit = () => {
        writePost({
            category: params.category,
            ...postForm
        })
    }

    useEffect(() => {
        if(board.create.code === 200) {
            resetBoard()
            navigate(`/console/read/${board.create.data.category}/${board.create.data.no}`)
            message.success("등록되었습니다.")
        } else {
            httpMessageExecute(board.create.code)
        }
    }, [navigate, resetBoard, board.create])

    return (
        <>
            <PageHeader
                title={`${params.category.toUpperCase()}에 글 쓰기`}
                onBack={() => navigate(-1)}/>
            <br /><br />
            <PostEditorComp
                loading={board.loading}
                onSubmit={handleSubmit}
                postForm={postForm}
                setPostForm={setPostForm} />
        </>


    );
};

export default BoardWrite;