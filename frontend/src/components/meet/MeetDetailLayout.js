import React, { useState, useEffect } from 'react';
import { Button, Carousel, Card, Avatar, notification, Tooltip, Typography } from 'antd';
import { HeartTwoTone, HeartOutlined, EditOutlined, DeleteOutlined, MenuOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import Axios from "axios";
import moment from "moment";
import TokenVerify from 'utils/TokenVerify';
import { setToken, useAppContext } from 'store';
import { userState } from 'state';
import DetailMap from './DetailMap';


const MeetDetailLayout = ({meet, setMeet}) => {
    console.log(meet);
    const { id, author: {avatar_url, email, id: user_id, name, nickname}, title, content, status, place, place_lat, place_lng, date_at, time_at, created_at, updated_at, is_attendance, attendance } = meet;
    const { store: token, dispatch } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const location = useLocation();
    const user = useRecoilValue(userState);
    
    const userVerify = async () => {
        const data = await TokenVerify(token);
        console.log(data.length);
        if (data.length > 100){
            console.log("토큰 재발급");
            dispatch(setToken(data, token['refreshToken']));
        } else if(data.response && data.response.status === 401){
            console.log(data);
            notification.open({
                message: '로그인 만료',
                description: '다시 로그인을 해주세요.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });

            history('/accounts/login', {state: {from: location}} );
            return;
        }
    }

    const handleLike = async () => {
        try{
            const response = await Axios.post(`http://localhost:8000/meet/${id}/attendance/`, '', { headers })
            const { data } = await Axios.get(`http://localhost:8000/meet/${id}/`, { headers });
            setMeet(data);

        }catch(error){
            console.log(error);
        }
    }
    
    const handlerEdit = (e) => {
        e.preventDefault();
        userVerify();

        if (user_id === user['userId']){
            history('edit');
        } else{
            notification.open({
                message: '게시글 작성자가 아닙니다.',
                description: '게시글을 수정할 권한이 없습니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
    }

    const handlerDelete = async (e) => {
        e.preventDefault();
        userVerify();
        
        if (user_id === user['userId']){
            const response = await Axios.delete(`http://localhost:8000/meet/${id}/`, { headers });

            notification.open({
                message: '게시글 삭제가 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                
            });

            history('/meet');
        } else{
            notification.open({
                message: '게시글 작성자가 아닙니다.',
                description: '게시글을 삭제할 권한이 없습니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
    }
    
    return (
        <>
            <Card
                title={(
                    <div>
                        <div className="cardTitle">
                            <div>
                                <Typography.Text type={status}>[{status === 'success'? '모집중' : '모집종료'}]</Typography.Text> {title}
                            </div>
                            <Tooltip title={moment(created_at).format('YYYY-MM-DD HH:mm')}>
                                {moment(created_at).fromNow()}
                            </Tooltip>
                        </div>
                    </div>
                )}
                cover={
                    [
                        <DetailMap lat={place_lat} lng={place_lng}/>
                    ]
                }
                actions={
                    user_id === user['userId'] ? (
                        [
                            is_attendance ? (
                                <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike()} /> 
                            ):(
                                <HeartOutlined onClick={()=> handleLike()}/>
                            ),
                            <MenuOutlined onClick={() => history('/meet')}/>,
                            <EditOutlined onClick={(e) => {handlerEdit(e, {user_id})}}/>,
                            <DeleteOutlined onClick={(e) => {handlerDelete(e, {user_id})}}/>
                        ]
                    ):(
                        [
                            is_attendance ? (
                                <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike()} /> 
                            ):(
                                <HeartOutlined onClick={()=> handleLike()}/>
                            ),
                            <MenuOutlined onClick={() => history('/meet')}/>,
                        ]
                    )
                }
            >
                <Card.Meta
                    avatar={
                        <div className="cardAvatar">
                            <div>
                                <Avatar
                                    icon={
                                        avatar_url && <img src={avatar_url}/>
                                    }
                                    size='large'
                                />
                            </div>
                            <div className='cardNickname'>
                                { nickname }
                            </div>
                            <div>
                                <Tooltip title={attendance}>
                                    [참석자명단]
                                </Tooltip>
                            </div>
                        </div>
                    }
                    title= {
                        <div>
                            <Typography.Text type={'danger'}>[모임장소 및 날짜]</Typography.Text> {place} / {date_at} {time_at} 
                        </div>
                    }
                    description={content}
                />
            </Card>
        </>
    )
}

export default MeetDetailLayout;