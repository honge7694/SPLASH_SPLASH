import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Tabs, notification, Card } from 'antd';
import { FrownOutlined} from '@ant-design/icons';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api'
import UserArticleList from 'components/accounts/UserArticleList';


const UserArticleLayout = () => {
    const [meetList, setMeetList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [profile, setProfile] = useState();
    const history = useNavigate();
    const { store: token } = useAppContext();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const { Content } = Layout;
    const { TabPane } = Tabs;

    useEffect(() => {
        async function fetchMeetList() {
            const apiUrl = '/meet/article/';
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
                const { data } = await axiosInstance.get(apiUrl, {headers});
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
            const apiUrl = '/post/article/';
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
                const { data } = await axiosInstance.get(apiUrl, {headers});
                setPostList(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchPostList();

        async function fetchProfile() {
            const apiUrl = `/accounts/edit/${user['userId']}/`;
            try{
                const headers = { Authorization: `Bearer ${token['jwtToken']}`};
                const { data } = await axiosInstance.get(apiUrl, {headers});
                setProfile(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

    console.log('profile : ', profile);

    return (
        <div>
            <Layout>
                <Content>
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <Avatar size={64} icon={<img src={profile && profile.avatar_url}/>} />
                            <div style={{ marginLeft: '16px' }}>
                                <h2>{profile && profile.nickname}</h2>
                                <p>{profile && profile.email}</p>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                        자유게시판
                                    </span>
                                }
                                key="1"
                            >
                                {postList && <UserArticleList data={postList} />}
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        모임게시판
                                    </span>
                                }
                                key="2"
                            >
                                {meetList && <UserArticleList data={meetList} />}
                            </TabPane>
                        </Tabs>
                    </Card>
                </Content>
            </Layout>
        </div>
    );
}

export default UserArticleLayout;