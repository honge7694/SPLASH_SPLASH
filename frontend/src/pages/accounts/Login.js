import React, { useState } from 'react';
import { Button, Form, Input, notification, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import '../../style/accounts/Login.scss';
import useLocalStorage from 'utils/useLocalStorage';



const Login = () => {
    const history = useNavigate();
    const [ jwtToken, setJwtToken ] = useLocalStorage("jwtToken", "");
    const [ refreshToken, setRefreshToken ] = useLocalStorage("refresh", "");
    const [api, setApi] = notification.useNotification();

    console.log('jwtToken : ', jwtToken);
    console.log('refreshToken : ', refreshToken);

    const onFinish = (values) => {
        console.log("inputs : ", values);
        const { email, password } = values;
        const data = { email, password };

        const handleSubmit = async () => {
            try{
                const response = await Axios.post('http://localhost:8000/accounts/api/token/', data)
                console.log('response : ', response);
                const { data : {access : jwtToken, refresh } } = response;

                console.log(jwtToken, refresh);
                setJwtToken(jwtToken);
                setRefreshToken(refresh);


                api.info({
                    message: '로그인 성공',
                    icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                    
                });
                // TODO: simplejwt 관리
                // history('/');
            }catch(error){
                console.log(error.response);
                api.info({
                    message: '로그인 실패',
                    description: '유저 이메일, 패스워드를 확인해주세요.',
                    icon: <FrownOutlined style={{ color: "#fff333" }}/>
                });
            }
        }

        handleSubmit();
    }

    return (
        <div>
            {setApi}
            <Card title="로그인">
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    className="login-form"
                >
                    <Form.Item name="email" label="Email" rules={[  
                        {
                            type: 'email',
                            message: 'email 형식에 맞게 입력해주세요.',
                        },{ required: true, },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" label="Password" rules={[ { required: true} ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item  wrapperCol={{ offset: 8, span: 16, }}>
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;