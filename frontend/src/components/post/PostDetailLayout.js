import React from 'react';
import { Carousel, Card, Avatar, notification, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, HeartTwoTone, HeartOutlined, EditOutlined, DeleteOutlined, MenuOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { axiosInstance } from 'api';
import moment from "moment";
import '../../style/post/PostLayout.scss';
import TokenVerify from 'utils/TokenVerify';
import { setToken, useAppContext } from 'store';
import { userState } from 'state';


const PostDetailLayout = ({post, handleLike}) => {
    console.log(post);
    const { id, author, title, content, images, likes, is_like, created_at, updated_at } = post;
    const { store: token, dispatch } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const location = useLocation();
    const user = useRecoilValue(userState);
    
    const userVerify = async () => {
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
                icon: <FrownOutlined style={{ color: "red" }}/>
            });

            history('/accounts/login', {state: {from: location}} );
            return;
        }
    }
    
    const handlerEdit = (e, author) => {
        e.preventDefault();
        userVerify();

        if (author.author.id === user['userId']){
            history('edit');
        } else{
            notification.open({
                message: '게시글 작성자가 아닙니다.',
                description: '게시글을 수정할 권한이 없습니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
    }

    const handlerDelete = async (e, author) => {
        e.preventDefault();
        userVerify();
        
        if (author.author.id === user['userId']){
            const response = await axiosInstance.delete(`/post/${id}/`, { headers });

            notification.open({
                message: '게시글 삭제가 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                
            });

            history('/post');
        } else{
            notification.open({
                message: '게시글 작성자가 아닙니다.',
                description: '게시글을 삭제할 권한이 없습니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
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
                            <Tooltip title={moment(created_at).format('YYYY-MM-DD HH:mm')}>
                                {moment(created_at).fromNow()}
                            </Tooltip>
                        </div>
                    </div>
                )}
                cover={
                    <Carousel dots={false} arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} >
                        {images && images.map(image => (
                            console.log(image),
                            <div key={image.image}>
                                <img  src={ image.image }/>
                            </div>
                        ))}
                    </Carousel>
                }
                actions={
                    author.id === user['userId'] ? (
                        [
                            is_like ? (
                                <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike()} /> 
                            ):(
                                <HeartOutlined onClick={()=> handleLike()}/>
                            ),
                            <MenuOutlined onClick={() => history('/post')}/>,
                            <EditOutlined onClick={(e) => {handlerEdit(e, {author})}}/>,
                            <DeleteOutlined onClick={(e) => {handlerDelete(e, {author})}}/>
                        ]
                    ):(
                        [
                            is_like ? (
                                <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike()} /> 
                            ):(
                                <HeartOutlined onClick={()=> handleLike()}/>
                            ),
                            <MenuOutlined onClick={() => history('/post')}/>,
                        ]
                    )
                }
            >
                <Card.Meta
                    avatar={
                        <div className="cardAvatar">
                            <div>
                                <Avatar
                                    icon={
                                        author.avatar_url && <img src={ post.author.avatar_url }/>
                                    }
                                    size='large'
                                />
                            </div>
                            <div className='cardNickname'>
                                { author.nickname }
                            </div>
                        </div>
                    }
                    title= {<>LIKE {likes}</>}
                    description={content}
                />
            </Card>
            {/* {post.images && post.images[0].image} */}
        </>
    )
}

export default PostDetailLayout;