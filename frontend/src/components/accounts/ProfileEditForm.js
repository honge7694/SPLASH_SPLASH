import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, DatePicker, notification, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useAppContext } from 'store';
import { DefaultValue, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import Axios from "axios";
import moment from "moment";


const ProfileEditForm = () => {
    const [profile, setProfile] = useState();
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const { store: token } = useAppContext();
    const { Option } = Select;

    useEffect(() => {
        async function fetchProfileData() {
            const apiUrl = `http://localhost:8000/accounts/edit/${user['userId']}/`;
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
                const { data } = await Axios.get(apiUrl, { headers });
                console.log("response : ", data);
                setProfile(data);
            }catch(error){
                console.log(error);

                if (error.response.status === 404){
                    
                    notification.open({
                        message: '로그인 후 이용해주세요.',
                        description: '회원 정보를 확인할 수 없습니다.',
                        icon: <FrownOutlined style={{ color: "red" }}/>
                    });
                    
                    resetUser();
                    history('/accounts/login');
                }
            }
        }

        fetchProfileData();
    },[])

    const onFinish = async (fieldValues) => {
        console.log(fieldValues);
        const headers = { Authorization: `Bearer ${token['jwtToken']}`};
        const { nickname, first_name, last_name, date_of_birth, phone_number, gender, password } =fieldValues;

        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('date_of_birth', date_of_birth.format('YYYY-MM-DD'));
        formData.append('phone_number', phone_number);
        formData.append('gender', gender);
        // formData.append('password', password);

        const response = await Axios.patch(`http://localhost:8000/accounts/edit/${user['userId']}/`, formData, { headers });
        console.log(response);
        // if (response.status === 200){
        //     history(`/meet/${id}`)
        // }
    }

    const validateMessages = {
        required: '${label}은 필수 입력 항목입니다.',
        types: {
            email: '${label} 유효한 이메일 주소를 입력해주세요.',
        }
    };

    const fields = profile ? [
        { name: ['nickname'], value: profile.nickname},
        { name: ['first_name'], value: profile.first_name },
        { name: ['last_name'], value: profile.last_name },
        { name: ['date_of_birth'], value: moment(profile.date_of_birth, "YYYY-MM-DD") },
        { name: ['phone_number'], value: profile.phone_number },
        { name: ['gender'], value: profile.gender },
    ]
    : [];

    return (
        <>
            {profile && 
                <Card title='회원수정'>
                <Form
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                    fields={fields}
                >

                    <Form.Item name="nickname" label="Nickname" rules={[ { required: true }, { min: 4, message: "2글자 이상입력해주세요."} ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="first_name" label="First name" rules={[ { required: true} ]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="last_name" label="Last name" rules={[ { required: true} ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="date_of_birth" label="Date of birth" rules={[ {required: true} ]} defaultValue={moment(profile.date_of_birth, "YYYY-MM-DD")} format="YYYY-MM-DD" >
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

                    <Form.Item  wrapperCol={{ offset: 8, span: 16, }}>
                        <Button type="primary" htmlType="submit">
                            회원수정
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            
            }
        </>
    )
}

export default ProfileEditForm;