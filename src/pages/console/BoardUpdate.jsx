import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {message, PageHeader, Spin} from "antd";
import PostEditorComp from "../../components/PostEditor.comp";
import useBoard from "../../hooks/useBoard";

const BoardUpdate = () => {
    const params = useParams()
    const { board, readPosts, updatePost, resetBoard } = useBoard()
    const [postForm, setPostForm] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        if(board.read.code === 0) {
            readPosts(params.category)
        }

        if(board.read.code === 200) {
            const data = board.read.data[params.category].filter(value => value.no === params.no)[0]
            if(data) {
                setPostForm({
                    title: data.title,
                    content: data.description,
                    files: data.files
                })
            }
        }
        // 의존성 배열에 readPosts 추가 시 무한루프에 빠집니다.
        // eslint-disable-next-line
    }, [params.category, params.no, board.read])

    useEffect(() => {
        if(board.update.code === 200) {
            navigate(`/console/read/${board.update.data.category}/${board.update.data.no}`)
            resetBoard()
            message.success("수정되었습니다.")
        }
    }, [board.update, navigate, resetBoard])

    const onSubmitHandle = () => {
        updatePost({
            no: params.no,
            category: params.category,
            ...postForm
        })
    }

    if(postForm) {
        return (
            <div>
                <PageHeader
                    title={`${params.no} 글 수정`}
                    onBack={() => navigate(-1)}/>
                <br /><br />
                <PostEditorComp
                    loading={board.loading}
                    postForm={postForm}
                    setPostForm={setPostForm}
                    onSubmit={onSubmitHandle} />
            </div>
        );
    } else {
        return <Spin />
    }

};

export default BoardUpdate;