import React from 'react';
import { Button, Carousel, Card, Avatar } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import '../../style/post/PostLayout.scss';


const PostDetailLayout = ({post}) => {
    console.log(post.images && post.images);
    console.log(post)
    const { id, author, title, content, images, created_at, updated_at } = post;
    
    // TODO: Like, Edit, Delete
    const handlerHeart = (e) => {
        e.preventDefault();
        console.log('heartClick');
    }

    const handlerEdit = (e) => {
        e.preventDefault();
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
                                {title}
                            </div>
                            <div>
                                {created_at}
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
                                        "dd"
                                        // FIXME: avatar_url렌더링늦는거 
                                        // post.author.avatar_url && <img src={"http://localhost:8000" + post.author.avatar_url}/>
                                    }
                                    size='large'
                                />
                            </div>
                            <div className='cardNickname'>
                                {/* {author.nickname} */}
                            </div>
                        </div>
                    }
                    // title={post.author.nickname && post.author.nickname}
                    description={content}
                />
            </Card>
            {/* {post.images && post.images[0].image} */}
        </>
    )
}

export default PostDetailLayout;