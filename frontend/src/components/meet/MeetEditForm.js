import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import moment from "moment";
import { useAppContext } from 'store';
import WriteMap from './WriteMap';
import { axiosInstance } from 'api';


const MeetEditForm = ({meet}) => {
    console.log(meet);
    const { id, author: {avatar_url, email, id: user_id, name, nickname}, title: title_data, content: content_data, status: status_data, place: place_data, place_lat, place_lng, date_at, time_at, created_at, updated_at, is_attendance, attendance } = meet;
    const [title, setTitle] = useState(title_data);
    const [content, setContent] = useState(content_data);
    const [place, setPlace] = useState(place_data);
    const [placeLat, setPlaceLat] = useState(place_lat);
    const [placeLng, setPlaceLng] = useState(place_lng);
    const [dateAt, setDateAt] = useState(moment(date_at, "YYYY-MM-DD"));
    const [timeAt, setTimeAt] = useState(moment(time_at, "HH:mm"));
    const [status, setStatus] = useState(status_data);
    const { store: token } = useAppContext();
    const { Option } = Select;
    // const [form] = Form.useForm();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const fields = [
        { name: ['title'], value: title},
        { name: ['content'], value: content},
        { name: ['place'], value: place},
        { name: ['place_lat'], value: placeLat },
        { name: ['place_lng'], value: placeLng },
        { name: ['date_at'], value: dateAt },
        { name: ['time_at'], value: timeAt },
        { name: ['status_data'], value: status_data },
    ];

    const handleFinish = async (fieldValues) => {
        console.log(fieldValues);
        const {title: titleField, content: contentField, place: placeField, place_lat, place_lng, date_at, time_at: time_atField, status} = fieldValues;
        const formData = new FormData();
        formData.append('title', titleField);
        formData.append('content', contentField);
        formData.append('place', placeField);
        formData.append('place_lat', place_lat);
        formData.append('place_lng', place_lng);
        formData.append('date_at', date_at.format('YYYY-MM-DD'));
        formData.append('time_at', time_atField.format('HH:mm'));
        formData.append('status', status)

        const response = await axiosInstance.put(`/meet/${id}/`, formData, { headers });
        console.log(response);
        if (response.status === 200){
            history(`/meet/${id}`)
        }
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
        <div>
            <WriteMap changeLat={changeLat} changeLng={changeLng} changePlace={changePlace} Lat={place_lat} Lng={place_lng} />
            
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
                    <Input value={title} />
                </Form.Item>

                <Form.Item name="content" label="content" rules={[  
                    {
                        message: '내용을 입력해주세요.',
                    },{ required: true, },
                ]} hasFeedback>
                    <Input.TextArea value={content} autoSize={true}/>
                </Form.Item>

                <Form.Item name="date_at" label="date" rules={[ {required: true }]} defaultValue={moment(date_at, "YYYY-MM-DD")} format="YYYY-MM-DD" >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item name="time_at" label="time" rules={[ {required: true }]} defaultValue={moment(time_at, "HH:mm")} format="HH:mm">
                    <TimePicker format="HH:mm" />
                </Form.Item>

                <Form.Item name="place_lat" label="place_lat" hasFeedback hidden>
                    <Input value={placeLat} />
                </Form.Item>

                <Form.Item name="place_lng" label="place_lng" hasFeedback hidden>
                    <Input value={placeLng} />
                </Form.Item>

                <Form.Item name="status" label="status" hasFeedback rules={[ {required: true }]}>
                    <Select value={status}>
                        <Option value="success">모집중</Option>
                        <Option value="warning">모집완료</Option>
                    </Select>
                </Form.Item>

                <Form.Item  style={{ margin: '0px auto' }}>
                    <Button type="primary" htmlType="submit">
                        작성완료
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default MeetEditForm;