import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useRecoilValue, useResetRecoilState } from "recoil";
import Chat from './chat/ChatLayout';
import SideMenu from './SideMenu';
import '../style/AppLayout.scss';
import { userState } from 'state';
import Header from './Header';
import { Footer } from 'antd/es/layout/layout';


const AppLayout =  (props) => {
    const { children } = props;
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();

    // useEffect(() => {
    //         console.log(user);
            
    //         notification.open({
    //             message: '로그인 후 이용해주세요.',
    //             description: '회원 정보를 확인할 수 없습니다.',
    //             icon: <FrownOutlined style={{ color: "red" }}/>
    //         });
            
    //         resetUser();
    //         history('/accounts/login');
    // }, [])

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
                    <Footer />
                </div>
            </div>
            <div className='side-menu'>
                <SideMenu />
            </div>
        </div>
    );
}

export default AppLayout;