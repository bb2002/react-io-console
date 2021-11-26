import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {fbStorage} from "../libs/Firebase";

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FileUploaderComp = ({ onFileChanged, onStateChanged }) => {
    const [fileState, setFileState] = useState([])
    const [numOfUploader, setNumOfUploader] = useState(1)

    const handleFileChanged = (e, idx) => {
        const file = e.target.files[0]
        const tmpStateArray = [...fileState]
        tmpStateArray[idx] = {
            state: "uploading",
            payload: undefined
        }
        setFileState(tmpStateArray)
        onFileChanged(tmpStateArray)

        const imageRef = ref(fbStorage, `/upload/${file.name}`)
        uploadBytesResumable(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then((url) => {
                // 업로드 성공
                const tmpStateArray = [...fileState]
                tmpStateArray[idx] = {
                    state: "done",
                    payload: url
                }
                setFileState(tmpStateArray)
                onFileChanged(tmpStateArray)
            });
        }).catch(ex => {
            // 업로드 오류 발생
            const tmpStateArray = [...fileState]
            tmpStateArray[idx] = {
                state: "failed",
                payload: ex
            }
            setFileState(tmpStateArray)
            onFileChanged(tmpStateArray)
        })
    }

    return (
        <FileUploadContainer>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ width: 250, marginBottom: 4 }}
                onClick={() => setNumOfUploader(numOfUploader + 1)}>파일 추가</Button>

            {
                Array.from(Array(numOfUploader).keys()).map(idx => (
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" onChange={(e) => handleFileChanged(e, idx)}/>
                        <label className="input-group-text" htmlFor="inputGroupFile02">
                            {
                                fileState[idx]?.state === "done" && ("완료")
                            }
                            {
                                fileState[idx]?.state === "uploading" && ("처리 중")
                            }
                        </label>
                    </div>
                ))
            }
        </FileUploadContainer>
    );
};

export default FileUploaderComp;