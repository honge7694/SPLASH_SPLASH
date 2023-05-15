import React, { useState } from 'react';
import { UserOutlined, FileTextOutlined, AppstoreOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


function getItem(label, key, icon, children, type, path) {
    return {
        key,
        icon,
        children,
        label,
        type,
        path,
    };
}


const SideMenu = () => {
    const history = useNavigate();

    const items = [
        getItem('자유게시판', 'post', <FileTextOutlined />),
        getItem('모임게시판', 'meet', <CalendarOutlined />),
        getItem('마이페이지', 'accounts', <UserOutlined />, [
            getItem('작성한 글 보기', '5', <AppstoreOutlined />),
            getItem('회원정보 수정', 'accounts/profile', <SettingOutlined />),
        ]),
    
    ];

    const handleMenuClick = (path) => {
        console.log(path)
        history(path);
    };

    return (
        <Menu className='menu' onClick={({ key }) => handleMenuClick(key)} items={items}/>
    );
}

export default SideMenu;