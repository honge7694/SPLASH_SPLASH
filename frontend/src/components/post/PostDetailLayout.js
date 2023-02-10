import React from 'react';
import { Button, Carousel, Card, Avatar } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import '../../style/post/PostLayout.scss';
import TokenVerify from 'utils/TokenVerify';
import { setToken, useAppContext } from 'store';


const PostDetailLayout = ({post}) => {
    const { id, author, title, content, images, created_at, updated_at } = post;
    const { store: token, dispatch } = useAppContext();
    
    // TODO: Like, Edit, Delete
    const handlerHeart = (e) => {
        e.preventDefault();
        console.log('heartClick');
    }

    const handlerEdit = async (e) => {
        e.preventDefault();
        const data = await TokenVerify(token);
        if (data){
            console.log("토큰 재발급");
            dispatch(setToken(data, token['refreshToken']));

        }
        console.log("성공?");

    }

    const handlerDelete = (e) => {
        e.preventDefault();
    }
    
    return (
        <>
            <Card
                title={(
                    <div>
                        <div className="cardTitle">
                            <div>
                                { title }
                            </div>
                            <div>
                                { created_at }
                            </div>
                        </div>
                    </div>
                )}
                cover={
                    <Carousel dots={false} arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} >
                        {images && images.map(image => (
                            <div key={image.image}>
                                <img  src={"http://localhost:8000/media/" + image.image }/>
                            </div>
                        ))}
                    </Carousel>
                }
                actions={[
                    <HeartOutlined onClick={handlerHeart}/>,
                    <EditOutlined onClick={handlerEdit}/>,
                    <DeleteOutlined onClick={handlerDelete}/>
                ]}
            >
                <Card.Meta
                    avatar={
                        <div className="cardAvatar">
                            <div>
                                <Avatar
                                    icon={
                                        author.avatar_url && <img src={"http://localhost:8000" + post.author.avatar_url}/>
                                    }
                                    size='large'
                                />
                            </div>
                            <div className='cardNickname'>
                                { author.nickname }
                            </div>
                        </div>
                    }
                    title= {<>LIKE 0</>}
                    description={content}
                />
            </Card>
            {/* {post.images && post.images[0].image} */}
        </>
    )
}

export default PostDetailLayout;