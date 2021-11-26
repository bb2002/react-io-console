import React, {useState} from 'react';
import {Button, Input, PageHeader, Upload} from "antd";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import {RedoOutlined, SaveOutlined, UploadOutlined} from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {fbStorage} from "../../libs/Firebase";
import FileUploaderComp from "../../components/FileUploader.comp";

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

const BoardWrite = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [boardForm, setBoardForm] = useState({
        title: "",
        content: "",
        files: []
    })

    const handleFileUploader = (state) => {
        console.log(state)
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <PageHeader
                title={`${params.category.toUpperCase()}에 글 쓰기`}
                onBack={() => navigate(-1)}/>
            <br /><br />
            <TitleInput
                placeholder="제목을 입력해주세요."
                onChange={(e) => setBoardForm({ ...boardForm, title: e.target.value })}
                value={boardForm.title}
                size="large" />
            <ReactQuill
                style={{ height: 500, marginTop: 48, marginBottom: 48 }}
                value={boardForm.content}
                onChange={(value) => setBoardForm({ ...boardForm, content: value })} />
            <FileUploaderComp onFileChanged={handleFileUploader}/>

            <ButtonContainer >
                <Button type="default" style={{ width: 100 }}><RedoOutlined /> 초기화</Button>
                <div style={{ width: 8 }} />
                <Button type="primary" style={{ width: 150 }} onClick={handleSubmit}><SaveOutlined /> 글 등록</Button>
            </ButtonContainer>
        </div>
    );
};

export default BoardWrite;