import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Button, Card, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useResetRecoilState } from "recoil";
import { userState } from 'state';
import { useAppContext } from 'store';
import MeetListLayout from 'components/meet/MeetListLayout';
import CalendarLayout from 'components/meet/CalendarLayout';

const MeetsList = () => {
    const [meetList, setMeetList] = useState([]);
    const history = useNavigate();
    const { store: token } = useAppContext();
    const resetUser = useResetRecoilState(userState);
    const apiUrl = 'http://localhost:8000/meet/';
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchMeetList() {
            try{
                const { data } = await Axios.get(apiUrl, {headers});
                setMeetList(data);
            }catch(error){
                console.log(error);
                if (error.response.status === 403){
                    
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
        fetchMeetList();
    }, []);

    const handlerNew = () => {

    }

    return (
        <Card
            title={
                <div className='PostList-Card-Title'>
                    모임게시판
                    <Button onClick={handlerNew}>글쓰기</Button>
                </div>
            }
        >
            {CalendarLayout && <CalendarLayout data={meetList} />}
            {MeetListLayout && <MeetListLayout data={meetList} />}
        </Card>
    )
}

export default MeetsList;