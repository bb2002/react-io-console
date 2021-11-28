import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, message, PageHeader} from "antd";
import styled from "styled-components";
import {DeleteOutlined} from "@ant-design/icons";
import useBoard from "../../hooks/useBoard";

const DeleteConfirmCard = styled(Card)`
  width: 500px;
  margin: 48px auto 0;
`

const BoardDelete = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { board, deletePost, resetBoard } = useBoard()

    const onDeleteHandle = () => {
        deletePost(params.category, params.no)
    }

    useEffect(() => {
        if(board.remove.code === 200) {
            message.success("삭제했습니다.")
            navigate(`/console/list/${params.category}`)
            resetBoard()
        }
    }, [board.remove.code, navigate, params.category, resetBoard])

    return (
        <div>
            <Card bodyStyle={{ padding: 8 }} style={{ marginBottom: 36 }}>
                <PageHeader
                    title={`${params.category.toUpperCase()} 게시판`}
                    subTitle={`${params.no} 글 삭제`}/>
            </Card>
            <Alert message="삭제된 글은 영원히 복원 할 수 없습니다!" type="warning" showIcon={true} />
            <DeleteConfirmCard
                title="정말로 삭제하시겠습니까?">
                <Button
                    type="primary"
                    danger={true}
                    onClick={onDeleteHandle}><DeleteOutlined /> 삭제</Button>
                <Button
                    type="default"
                    style={{ marginLeft: 4 }}
                    onClick={() => navigate(`/console/list/${params.category}`)}>취소</Button>
            </DeleteConfirmCard>

        </div>
    );
};

export default BoardDelete;