import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Modal, Select, TimePicker } from 'antd';
import Axios from 'axios';
import { useAppContext } from 'store';
import WriteMap from './WriteMap';


const MeetNewForm = () => {
    const { Option } = Select;
    // const [form] = Form.useForm();
    const [place, setPlace] = useState();
    const [placeLat, setPlaceLat] = useState(0);
    const [placeLng, setPlaceLng] = useState(0);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const fields = [
        { name: ['place'], value: place},
        { name: ['place_lat'], value: placeLat },
        { name: ['place_lng'], value: placeLng },
    ];
    

    const handleFinish = async (fieldValues) => {
        fieldValues["date_at"] = fieldValues['date_at'].format("YYYY-MM-DD");
        fieldValues["time_at"] = fieldValues['time_at'].format("HH:mm");
        try{
            const response = await Axios.post('http://localhost:8000/meet/', fieldValues, {headers});
            console.log(response);
        }catch(error){
            console.log(error);
        }

        history('/meet');
    };

    const validateMessages = {
        required: '${label}을 입력해주세요.',
    }

    const changePlace = (value) => {
        setPlace(value);
    }

    const changeLat = (value) => {
        setPlaceLat(value);
    };

    const changeLng = (value) => {
        setPlaceLng(value);
    };
    
    return (
        <>
            <WriteMap changeLat={changeLat} changeLng={changeLng} changePlace={changePlace} />
            
            <Form
                onFinish={handleFinish}
                layout="vertical"
                validateMessages={validateMessages}
                fields={fields}
                // form={form}
            >
                <Form.Item name="place" label="place" rules={[  
                    {
                        message: '장소를 정해주세요.',
                    },{ required: true, },
                ]} hasFeedback>
                    <Input />
                </Form.Item>

                <Form.Item name="title" label="title" rules={[  
                    {
                        message: '제목을 입력해주세요.',
                    },{ required: true, },
                ]} hasFeedback>
                    <Input value={place} />
                </Form.Item>

                <Form.Item name="content" label="content" rules={[  
                    {
                        message: '내용을 입력해주세요.',
                    },{ required: true, },
                ]} hasFeedback>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name="date_at" label="date" rules={[ {required: true }]} >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item name="time_at" label="time" rules={[ {required: true }]} >
                    <TimePicker format="HH:mm" />
                </Form.Item>

                <Form.Item name="place_lat" label="place_lat" hasFeedback hidden>
                    <Input value={placeLat} />
                </Form.Item>

                <Form.Item name="place_lng" label="place_lng" hasFeedback hidden>
                    <Input value={placeLng} />
                </Form.Item>

                <Form.Item  style={{ margin: '0px auto' }}>
                    <Button type="primary" htmlType="submit">
                        작성완료
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
}

export default MeetNewForm;