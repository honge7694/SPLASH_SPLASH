import React, { useState } from 'react';
import { Button, Form, Input, notification, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import Axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../style/accounts/Login.scss';
import { setToken, useAppContext } from 'store';



const Login = () => {
    const { dispatch } = useAppContext();
    const location = useLocation();
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();
    const { from: loginRedirectUrl } = location.state || { from: { pathname: '/'}};

    const onFinish = (values) => {
        console.log("inputs : ", values);
        const { email, password } = values;
        const data = { email, password };

        const handleSubmit = async () => {
            try{
                const response = await Axios.post('http://localhost:8000/accounts/api/token/', data)
                const { data : {access : jwtToken, refresh: refreshToken } } = response;
                
                console.log('response : ', response);
                console.log(jwtToken, refreshToken);

                dispatch(setToken(jwtToken, refreshToken));
                // dispatch(setRefreshToken(refreshToken));


                api.info({
                    message: '로그인 성공',
                    icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                    
                });

                history(loginRedirectUrl);

            }catch(error){
                console.log('error : ', error.response);
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