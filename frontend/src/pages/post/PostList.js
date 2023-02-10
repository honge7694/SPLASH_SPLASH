import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Avatar, Button, List, Space } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useAppContext } from 'store';
import '../../style/post/PostList.scss';


const apiUrl = 'http://localhost:8000/post/'

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const history = useNavigate();
    const { store: token } = useAppContext();

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token['jwtToken']}`};
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                console.log('PostList loaded response : ', response)
                setPostList(data);
            })
            .catch(error => {
                console.log('error : ', error);
            })
    }, [])

    const data = postList.map((post) => {
        const { id, title, content, author, images, created_at, updated_at } = post;
        return (
            ({
                id: { id },
                title: { title },
                content: { content },
                author: { author },
                images: { images },
                created_at: { created_at },
                updated_at: { updated_at },
            })
        )
    })

    // console.log('data : ', data);
    // console.log('data : ', data[21].images.images[0]['image']);

    const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
    );

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        
        history(''+id);
    }

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={data}
                footer={
                    <div>
                        <Button>글쓰기</Button>
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
                        key={item.id['id']}
                        actions={[
                            // TODO: 댓글, 좋아요 수정
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            item.images.images.length === 0 ? (
                                <img
                                    width={180}
                                    height={120}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            ) : (
                                <img 
                                    width={180} 
                                    height={120} 
                                    src={"http://localhost:8000/media/" + item.images.images[0]['image']}
                                    alt="logo"
                                /> 
                            )
                        }
                    >
                        <a href="#" onClick={ (e) => handlerOnClick(e, item.id.id) }>
                            <List.Item.Meta
                                avatar={<Avatar size='large' icon={ <img src={"http://localhost:8000" + item.author.author['avatar_url']}/> } />}
                                title={item.title['title']}
                                description={
                                    <div>
                                        <div>
                                            {item.author.author['nickname']}
                                        </div>
                                        <div>
                                            {item.created_at['created_at']}
                                        </div>
                                    </div>}  
                                style={{ alignItems: "center" }}
                                />
                                
                        </a>
                        </List.Item>
                )}
            />
        </>
    );
}

export default PostList;