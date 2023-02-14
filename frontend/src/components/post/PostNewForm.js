import React, { useState } from 'react';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getBase64FromFile from 'utils/base64';
import Axios from 'axios';
import { useAppContext } from 'store';



const PostNewLayout = () => {
    const { store: token } = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    })
    
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
        const { title, content, image: { fileList }} = fieldValues;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        fileList.forEach(file => {
            formData.append("image", file.originFileObj);
        });

        const headers = { Authorization: `Bearer ${token['jwtToken']}`};
        const response = await Axios.post('http://localhost:8000/post/', formData, { headers });
        console.log(response);
    };

    const validateMessages = {
        required: '${label}을 입력해주세요.',
    }

    
    return (
        <div>
            <Form
                onFinish={handleFinish}
                layout="vertical"
                className="post-new-form"
                validateMessages={validateMessages}
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
                    <Input.TextArea />
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

                <Form.Item  wrapperCol={{ offset: 8, span: 16, }}>
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
        </div>
    );
}

export default PostNewLayout;