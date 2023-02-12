import React from 'react';
import { Button, Carousel, Card, Avatar, notification } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, EditOutlined, DeleteOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../style/post/PostLayout.scss';
import TokenVerify from 'utils/TokenVerify';
import { setToken, useAppContext } from 'store';


const PostDetailLayout = ({post}) => {
    const { id, author, title, content, images, created_at, updated_at } = post;
    const { store: token, dispatch } = useAppContext();
    const history = useNavigate();
    const location = useLocation();

    
    // TODO: Like, Edit, Delete
    const handlerHeart = (e) => {
        e.preventDefault();
        console.log('heartClick');
    }

    const handlerEdit = async (e) => {
        e.preventDefault();
        const data = await TokenVerify(token);
        console.log(data.length);
        if (data.length > 100){
            console.log("토큰 재발급");
            dispatch(setToken(data, token['refreshToken']));
        } else if(data.response && data.response.status === 401){
            console.log(data);
            notification.open({
                message: '로그인 만료',
                description: '다시 로그인을 해주세요.',
                icon: <FrownOutlined style={{ color: "#fff333" }}/>
            });

            history('/accounts/login', {state: {from: location}} );
            return;
        }
        console.log("성공?");
        // TODO: 수정하기.

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