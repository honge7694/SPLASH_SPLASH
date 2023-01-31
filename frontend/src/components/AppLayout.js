import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Input, Menu } from 'antd';
import Chat from './Chat';
import SideMenu from './SideMenu';
import '../style/AppLayout.scss';


const items = [
    {
        label: '메뉴1',
        key: 'menu1',
        icon: <MailOutlined />
    },
    {
        label: '메뉴2',
        key: 'menu2',
        children: [
            {
                label: 'Option 1',
                key: 'setting:1',
            },
            {
                label: 'Option 2',
                key: 'setting:2',
            }
        ]
    },
    {
        label: '메뉴3',
        key: 'menu3'
    }
];

const AppLayout =  (props) => {
    const { children } = props;
    const [ current, setCurrent ] = useState('');
    const onClickHandler = (e) => {
        console.log(e);
        setCurrent(e.key);
    };


    return (
        <div className='app'>
            <div className='chat'>
                <Chat />
            </div>
            <div className='main'>
                <div className='header'>
                    <h1 className='page-title'>SPLASH-SPLASH</h1>
                    <div className='search'>
                        <Input.Search />
                    </div>
                    <div className='topNav'>
                        <Menu mode="horizontal" items={items} selectedKeys={ current } onClick={onClickHandler}></Menu>
                    </div>
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