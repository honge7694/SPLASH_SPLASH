import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';


const PostListLayout = ({data}) => {
    const history = useNavigate();

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
    };

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
    )
}

export default PostListLayout;
// TODO: pages/PostList.js -> PostListLayout.js 로직수정필요
