import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Tabs, Button, Form, Input, Select, DatePicker, notification, Card } from 'antd';
import { UserOutlined, CameraOutlined, HeartOutlined, SmileOutlined, FrownOutlined} from '@ant-design/icons';
import { useAppContext } from 'store';
import { DefaultValue, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import Axios from "axios";
import moment from "moment";
import UserPostList from 'components/post/UserPostList';
import UserMeetList from 'components/meet/UserMeetList';


const UserArticleLayout = () => {
    const [meetList, setMeetList] = useState([]);
    const [postList, setPostList] = useState([]);
    const history = useNavigate();
    const { store: token } = useAppContext();
    const resetUser = useResetRecoilState(userState);
    const { Content } = Layout;
    const { TabPane } = Tabs;


    useEffect(() => {
        async function fetchMeetList() {
            const apiUrl = 'http://localhost:8000/meet/';
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
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

        async function fetchPostList() {
            const apiUrl = 'http://localhost:8000/post/';
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
                const { data } = await Axios.get(apiUrl, {headers});
                setPostList(data);
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
        fetchPostList();

    }, []);

    return (
        <div>
            <Layout>
                <Content>
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <Avatar size={64} icon={<UserOutlined />} />
                            <div style={{ marginLeft: '16px' }}>
                                <h2>Username</h2>
                                <p>Bio</p>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                        {/* <CameraOutlined /> */}
                                        자유게시판
                                    </span>
                                }
                                key="1"
                            >
                                {/* Posts Content */}
                                {<UserPostList/>}
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        {/* <HeartOutlined /> */}
                                        모임게시판
                                    </span>
                                }
                                key="2"
                            >
                                {/* Likes Content */}
                                {<UserPostList/>}
                            </TabPane>
                        </Tabs>
                    </Card>
                </Content>
            </Layout>
        </div>
    );
}

export default UserArticleLayout;