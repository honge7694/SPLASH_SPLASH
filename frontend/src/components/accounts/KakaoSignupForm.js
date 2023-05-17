import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker, notification, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import Axios from "axios";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { setToken, useAppContext } from 'store';
import { useSetRecoilState } from "recoil";
import { userState } from '../../state';
import '../../style/accounts/Signup.scss';


const KakaoSignupForm = () => {
    const { Option } = Select;
    const [ fieldsErrors, SetFieldsErrors ] = useState({});
    const [api, setApi] = notification.useNotification();
    const { dispatch } = useAppContext();
    const setUser = useSetRecoilState(userState);
    const history = useNavigate();
    const location = useLocation();
    const item = location;
    const { state: { data: { user_info, access_token } }} = item;
    console.log("item : ", item);
    
    const onFinish = (values) => {
        const handleSubmit = async () => {
            console.log("inputs : ", values);
            values["date_of_birth"] = values['date_of_birth'].format("YYYY-MM-DD");
            const { nickname, first_name, last_name, date_of_birth, phone_number, gender } = values;
            const data = { nickname, first_name, last_name, date_of_birth, phone_number, gender };
            
            SetFieldsErrors({});

            try{
                const response = await Axios.patch(`http://localhost:8000/accounts/kakao/signup/${user_info.id}/`, data);
                console.log("response", response);

                api.info({
                    message: '추가 정보입력 완료',
                    description: '메인페이지로 이동합니다',
                    icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                    
                });

                const jwtToken = access_token;
                dispatch(setToken(jwtToken, ""));
                
                setUser({
                    userId: user_info.id,
                    userNickname: nickname,
                });

                history("/");

            }catch(error){
                console.log('error : ', error);
                if (error.response){
                    api.info({
                        message: '추가 정보입력 실패',
                        description: '필드 에러를 확인해주세요.',
                        icon: <FrownOutlined style={{ color: "red" }}/>
                    });
                    const { data: fieldsErrorMessages } = error.response;
                    SetFieldsErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                                };
                                return acc;
                            },
                            {}
                        )
                    )
                    console.log(fieldsErrors);
                }
                
            }
        }
        handleSubmit();
    }

    const validateMessages = {
        required: '${label}은 필수 입력 항목입니다.',
        types: {
            email: '${label} 유효한 이메일 주소를 입력해주세요.',
        }
    }

    return (
        <div className="signup-form">
            {setApi}
            <Card title='회원가입'>
                <Form
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                >
                    <Form.Item name="nickname" label="Nickname" rules={[ { required: true }, { min: 2, message: "2글자 이상입력해주세요."} ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="first_name" label="First name" rules={[ { required: true} ]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="last_name" label="Last name" rules={[ { required: true} ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="date_of_birth" label="Date of birth" rules={[ {required: true} ]}>
                        <DatePicker format='YYYY-MM-DD' />
                    </Form.Item>

                    <Form.Item name="phone_number" label="Phone number" rules={[ {required: true} ]}>
                        <Input placeholder="'-'를 제외하고 입력해주세요." />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[ {required: true }]}>
                        <Select placeholder="select your gender">
                            <Option value="M">남성</Option>
                            <Option value="F">여성</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item  wrapperCol={{ offset: 8, span: 16, }}>
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default KakaoSignupForm;