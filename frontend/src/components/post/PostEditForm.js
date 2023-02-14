import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getBase64FromFile from 'utils/base64';
import Axios from 'axios';
import { useAppContext } from 'store';


const PostEditForm = ({post}) => {
    console.log(post)
    const { title, content, images } = post;
    console.log(images[0].image);
    const { store: token } = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    })

    //FIXME: setFileList에 img넣기.
    // useEffect(() => {
    //     if(images.length > 0){
    //         for(let i=0; i < images.length; i++){
    //             setFileList({
    //                 url: 'http://localhost:8000/media/'+images[i].image
    //             });
    //         }
    //     }
    // },[]);

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
        const response = await Axios.put('http://localhost:8000/post/', formData, { headers });
        console.log(response);
    };

    const validateMessages = {
        required: '${label}을 입력해주세요.',
    }

    
    return (
        <div>
            <Card title="포스팅 수정">
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
                        <Input defaultValue={title}/>
                    </Form.Item>

                    <Form.Item name="content" label="content" rules={[  
                        {
                            message: '내용을 입력해주세요.',
                        },{ required: true, },
                    ]} hasFeedback>
                        <Input.TextArea defaultValue={content}/>
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