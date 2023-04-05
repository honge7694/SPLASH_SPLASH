import React, { useState, useEffect } from 'react';
import { Spin, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import { setToken, useAppContext } from 'store';
import { userState } from '../../state';


const OAuth2RedirectHandler = (props) => {
    const history = useNavigate();
    const { dispatch } = useAppContext();
    const setUser = useSetRecoilState(userState);
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("code : ", code);
    
    useEffect(() => {
        console.log("실행돼?")
        async function fetchData() {
            try{
                const { data } = await Axios.get(`http://127.0.0.1:8000/accounts/kakao/callback/?code=${code}`)
                console.log("data : ", data);
                if(data.status == 204){
                    console.log("소셜 회원가입으로 이동.");
                    history("/accounts/kakao/signup", {
                        state: { data: data }
                    })
                }else{
                    const jwtToken = data.access_token;
                    dispatch(setToken(jwtToken, ""));

                    notification.open({
                        message: '로그인 성공',
                        icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                        
                    });

                    setUser({
                        userId: data.user_info.id,
                        userNickname: data.user_info.nickname,
                    });

                    history("/");
                }

            }catch(error){
                console.log("error : ", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Spin tip="Loading" size="large" style={{marginTop: "30px", marginBottom: "30px"}}>
                <div className="content" />
            </Spin>
        </>
    );
};

export default OAuth2RedirectHandler;