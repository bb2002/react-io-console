import React, {useState} from 'react';
import {Button, Input} from "antd";
import ReactQuill from "react-quill";
import FileUploaderComp from "./FileUploader.comp";
import {RedoOutlined, SaveOutlined} from "@ant-design/icons";
import styled from "styled-components";

const TitleInput = styled(Input)`
  border: none !important;
  font-size: 2.5rem;
  box-shadow: none !important;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;
  padding-bottom: 48px;
`

/**
 * 글 에디터 기본 형태입니다.
 * @param postForm              PostForm 의 상태                   { title: string, content: string, files: string[] }
 * @param setPostForm           PostForm 의 상태가 변경된 경우
 * @param onSubmit              Submit 버튼을 누른 경우
 * @param loading               등록 버튼을 누른 경우, 로딩 중
 */
const PostEditorComp = ({ postForm, setPostForm, onSubmit, loading }) => {
    const [nowUploading, setNowUploading] = useState(false)

    const handleFileChanged = (uploadFiles) => {
        const doneFiles = uploadFiles.filter(value => value.status === "done")
        setPostForm({ ...postForm, files: doneFiles.map(value => value.xhr) })
    }

    const handleStateChanged = (uploading) => {
        setNowUploading(uploading)
    }

    const quillModules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['clean']
        ],
    }

    const quillFormats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    return (
        <div>
            <TitleInput
                placeholder="제목을 입력해주세요."
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                value={postForm.title}
                size="large" />
            <ReactQuill
                style={{ height: 500, marginTop: 48, marginBottom: 48 }}
                value={postForm.content}
                onChange={(value) => setPostForm({ ...postForm, content: value })}
                modules={quillModules}
                formats={quillFormats} />
            <FileUploaderComp
                defaultFiles={postForm.files}
                onFileChanged={handleFileChanged}
                onStateChanged={handleStateChanged}/>

            <ButtonContainer >
                <Button type="default" style={{ width: 100 }}><RedoOutlined /> 초기화</Button>
                <div style={{ width: 8 }} />
                <Button type="primary" style={{ width: 150 }} onClick={onSubmit} disabled={nowUploading} loading={loading}><SaveOutlined /> 저장</Button>
            </ButtonContainer>
        </div>
    );
};

export default PostEditorComp;