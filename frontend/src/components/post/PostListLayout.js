import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, List, Space } from 'antd';
import { HeartTwoTone, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import moment from "moment";
import PostLogo from "../../assets/post_logo.jpg"


const PostListLayout = ({data, handleLike}) => {
    console.log('data : ', data);
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
                    console.log(item.is_like),
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText icon={() => item.is_like ? (
                                    console.log(item.is_like),
                                    <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike({item})} /> 
                                ):(
                                    console.log(item.id),
                                    <HeartOutlined onClick={()=> handleLike({item})}/>
                                )} 
                                text={item.likes} key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" />,
                        ]}
                        extra={
                            item.images.length === 0 ? (
                                <img
                                    width={180}
                                    height={120}
                                    alt="logo"
                                    src={PostLogo}
                                />
                            ) : (
                                <img 
                                    width={180} 
                                    height={120} 
                                    src={ item.images[0]['image'] }
                                    alt="logo"
                                /> 
                            )
                        }
                    >
                        <a href="#" onClick={ (e) => handlerOnClick(e, item.id) }>
                            <List.Item.Meta
                                avatar={<Avatar size='large' icon={ <img src={ item.author.avatar_url }/> } />}
                                title={item.title}
                                description={
                                    <div>
                                        <div>
                                            {item.author.nickname}
                                        </div>
                                        <div>
                                            {moment(item.created_at).format("YYYY-MM-DD")}
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
