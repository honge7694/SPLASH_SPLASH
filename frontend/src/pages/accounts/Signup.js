import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import Axios from "axios";
import '../../style/accounts/Signup.scss';


const Signup = () => {
    const { Option } = Select;
    const dateFormat = 'YYYY-MM-DD';
    
    const onFinish = (values) => {
        console.log("inputs : ", values);
        values["date_of_birth"] = values['date_of_birth'].format("YYYY-MM-DD");
        const { email, password, nickname, first_name, last_name, date_of_birth, phone_number, gender } = values;
        const data = { email, password, nickname, first_name, last_name, date_of_birth, phone_number, gender };
        console.log(date_of_birth);
        Axios.post('http://localhost:8000/accounts/signup/', data)
            .then(response => {
                console.log('response : ', response);
            })
            .catch(error => {
                console.log('error : ', error.response.data);
            });
    }

    const validateMessages = {
        required: '${label}은 필수 입력 항목입니다.',
        types: {
            email: '${label} 유효한 이메일 주소를 입력해주세요.',
        }
    }

    return (
        <div className="signup-form">
            <Form
                onFinish={onFinish}
                validateMessages={validateMessages}
                layout="vertical"
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

                <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback 
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="nickname" label="Nickname" rules={[ { required: true }, { min: 4, message: "2글자 이상입력해주세요."} ]}>
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
        </div>
    );
}

export default Signup;