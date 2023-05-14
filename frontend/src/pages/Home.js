import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card } from 'antd';
import ImageSlider from 'components/ImageSlider';
import HomePostList from 'components//HomePostList';
import HomeMeetList from 'components//HomeMeetList';


const Home = () => {
    const [meetList, setMeetList] = useState([]);
    const [postList, setPostList] = useState([]);
    const MeetApiUrl = 'http://localhost:8000/meet/';
    const PostApiUrl = 'http://localhost:8000/post/';

    useEffect(() => {
        async function fetchMeetList() {
            try{
                const { data } = await Axios.get(MeetApiUrl);
                setMeetList(data);
            }catch(error){
                console.log(error);
            }

        }
        async function fetchPostList() {
            try{
                const { data } = await Axios.get(PostApiUrl);
                setPostList(data);
            }catch(error){
                console.log(error);
            }
        }

        fetchMeetList();
        fetchPostList();
    }, []);

    return (
        <div>
            <div style={{marginBottom: "1.5rem"}}>
                <ImageSlider />
            </div>
            <hr style={{width: "1018px", color: "gray"}}></hr>
            <div style={{marginBottom: "1.5rem", marginTop: "1.5rem"}}>
                <Card
                    title={
                        <div className='PostList-Card-Title'>
                            자유게시판
                        </div>
                    }
                >
                    {HomePostList && <HomePostList data={postList} />}
                </Card>
            </div>
            <hr style={{width: "1018px", color: "gray"}}></hr>
            <div style={{marginBottom: "1.5rem", marginTop: "1.5rem"}}>
                <Card
                    title={
                        <div className='PostList-Card-Title'>
                            모임게시판
                        </div>
                    }
                >
                    {HomeMeetList && <HomeMeetList data={meetList} />}
                </Card>
            </div>

        </div>
    );
}

export default Home;