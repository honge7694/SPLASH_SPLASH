import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { Input, Menu } from 'antd';
import { useRecoilValue, useResetRecoilState } from "recoil";
import Chat from './Chat';
import SideMenu from './SideMenu';
import '../style/AppLayout.scss';
import { userState } from 'state';
import Header from './Header';


const AppLayout =  (props) => {
    const { children } = props;
    const user = useRecoilValue(userState);

    return (
        <div className='app'>
            { user['userId'] == null ? (
                <div>

                </div>
            ) : (
                <div className='chat'>
                    <Chat />
                </div>
                )
            }
            <div className='main'>
                <div className='header'>
                    <Header />
                </div>

                <div className='contents'>
                    { children }
                </div>

                <div className='footer'>
                    Footer
                </div>
            </div>
            <div className='side-menu'>
                <SideMenu />
            </div>
        </div>
    );
}

export default AppLayout;