import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getBase64FromFile from 'utils/base64';
import { axiosInstance } from 'api'
import { useAppContext } from 'store';


const PostEditForm = ({post}) => {
    console.log(post)
    const { id } = useParams();
    const history = useNavigate();
    const { title, content, images } = post;
    const { store: token } = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    })

    useEffect(() => {
        if (images.length > 0) {
        const convertedFileList = images.map((image) => ({
            uid: image.id,
            name: image.name,
            status: 'done',
            url: `${image.image}`,
        }));
        setFileList(convertedFileList);
        }
    }, [images]);

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handlePreViewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj); 
            
        }

        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        })
    }

    const handleFinish = async (fieldValues) => {
        console.log('fieldValues : ', fieldValues);
        const { title, content, image} = fieldValues;
        const fileList = image?.fileList || [];

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        fileList.forEach(file => {
            formData.append("image", file.originFileObj);
        });
        const headers = { Authorization: `Bearer ${token['jwtToken']}`};
        const response = await axiosInstance.patch(`/post/${id}/`, formData, { headers });
        console.log(response);

        if (response.status === 200){
            history(`/post/${id}`);
        }
    };

    const validateMessages = {
        required: '${label}을 입력해주세요.',
    }

    const fields = [
        { name: ['title'], value: title},
        { name: ['content'], value: content },
    ]
    
    return (
        <div>
            <Card title="포스팅 수정">
                <Form
                    onFinish={handleFinish}
                    layout="vertical"
                    className="post-new-form"
                    validateMessages={validateMessages}
                    fields={fields}
                >
                    <Form.Item name="title" label="title" rules={[  
                        {
                            message: '제목을 입력해주세요.',
                        },{ required: true, },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item name="content" label="content" rules={[  
                        {
                            message: '내용을 입력해주세요.',
                        },{ required: true, },
                    ]} hasFeedback>
                        <Input.TextArea autoSize="True" />
                    </Form.Item>

                    <Form.Item label="image" name="image">
                        <Upload listType="picture-card" 
                            fileList={fileList} 
                            beforeUpload={() => {
                                return false;
                            }} 
                            onChange={handleUploadChange}
                            onPreview={handlePreViewPhoto}
                        >
                            {fileList.length > 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div className='ant-upload-text'>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item  style={{ margin: '0px auto' }}>
                        <Button type="primary" htmlType="submit">
                            작성완료
                        </Button>
                    </Form.Item>

                    <Modal open={previewPhoto.visible} footer={null} onCancel={() => setPreviewPhoto({ visible: false })}>
                        <img src={previewPhoto.base64} style={{ width: '100%'}} alt='Preview' />
                    </Modal>
                    <hr/>
                    {JSON.stringify(fileList)}
                </Form>
            </Card>
        </div>
    );
}

export default PostEditForm;