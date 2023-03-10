import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostNew from './PostNew';
import PostEdit from './PostEdit';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';


const PostsRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <PostList /> }></Route>
                <Route path='/:id' element={ <PostDetail /> }></Route>
                <Route element={ <LoginRequiredRoute /> }>
                    <Route path='/new' element={ <PostNew /> }></Route>
                    <Route path='/:id/edit' element={ <PostEdit /> }></Route>
                </Route>
            </Routes>
        </>
    );
}

export default PostsRoutes;