import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { userState } from 'state';
import Axios from 'axios';
import { useAppContext } from 'store';
import { useResetRecoilState } from "recoil";
import MeetDetailLayout from "../../components/meet/MeetDetailLayout";


const MeetDetail = () => {
    const { id } = useParams();
    const [meet, setMeet] = useState();
    const { store: token } = useAppContext();
    const history = useNavigate();
    const resetUser = useResetRecoilState(userState);
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchMeetData() { 
            const apiUrl = 'http://localhost:8000/meet/'+ id +'/'
            try{
                const { data } = await Axios.get(apiUrl, { headers });
                setMeet(data);

            } catch(error){
                console.error("error : ", error);
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
        fetchMeetData();
    }, []);

    return (
        <>
            {meet && <MeetDetailLayout meet={meet} /> }
        </>
    );
}


export default MeetDetail;