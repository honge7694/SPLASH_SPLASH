import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { deleteToken, useAppContext } from 'store';
import LogoImage from "../assets/splash_logo.png"


const Header = () => {
    const { dispatch } = useAppContext();
    const [ current, setCurrent ] = useState('');
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();

    const items = [
        {
            label: '로그인',
            key: 'login',
            // icon: <MailOutlined />
        },
        {
            label: '회원가입',
            key: 'signup',
        },
    ];

    const userItems = [
        {
            label: user['userNickname'] + "님 환영합니다!",
            key: 'userInfo',
        },
        {
            label: '로그아웃',
            key: 'Logout'
        }
    ]
    const onLogoClickHandler = (e) => {
        history('/');
    }
    
    const onClickHandler = (e) => {
        console.log(e);
        setCurrent(e.key);

        if(current === 'login'){
            history('/accounts/login');
        }

        if(current === 'signup'){
            history('/accounts/signup');
        }

        if (current === 'Logout'){
            console.log('로그아웃');
            resetUser();
            dispatch(deleteToken());
            history('/accounts/login');
        }
    };

    return(
        <div className='header'>
            <h1 className='page-title'><img src={LogoImage} style={{marginTop: "10px", width: "150px", height: "65px"}} onClick={onLogoClickHandler}></img></h1>
            <div className='search'>
                {/* <Input.Search /> */}
            </div>
            <div className='topNav'>
                <Menu mode="horizontal" items={user['userId'] == null ? items : userItems} selectedKeys={ current } onClick={onClickHandler}></Menu>
            </div>
        </div>
    )
}

export default Header;