import React from 'react';
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {fbStorage} from "../libs/Firebase";
import {getFilenameFromURL} from "../libs/Function";

const FileUploaderComp = ({ defaultFiles, onFileChanged, onStateChanged }) => {
    const props = {
        handleChange: (info) => {
            onFileChanged(info.fileList)
            if(info.fileList.filter(value => value.status === "uploading").length === 0) {
                onStateChanged(false)
            } else {
                onStateChanged(true)
            }
        },
        customUpload: ({ onError, onSuccess, file }) => {
            const imagePath = `/upload/${Math.random().toString(36).substr(2, 11)}/${file.name}`
            const imageRef = ref(fbStorage, imagePath)
            uploadBytesResumable(imageRef, file).then(snapshot => {
                getDownloadURL(snapshot.ref).then(url => {
                    onSuccess(null, url)
                }).catch(ex => {
                    onError(ex)
                })
            }).catch(ex => {
                onError(ex)
            })
        }
    }

    return (
        <Upload
            defaultFileList={defaultFiles.map(value => ({
                status: "done",
                name: getFilenameFromURL(value),
                url: value
            }))}
            onChange={props.handleChange}
            customRequest={props.customUpload}>
            <Button icon={<UploadOutlined />}> 파일 업로드</Button>
        </Upload>
    );
};

export default FileUploaderComp;