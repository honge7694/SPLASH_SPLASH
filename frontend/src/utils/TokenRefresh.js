import Axios from 'axios';
import { FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';


const TokenRefresh = async (token) => {    
    const apiUrl = 'http://localhost:8000/accounts/api/token/refresh/';
    const refreshToken = token;
    const data = { refresh: refreshToken };

    try{
        const response = await Axios.post(apiUrl, data);
        const newToken = response.data.access;
        return newToken;
    }catch(error){
        console.log(error);
        console.log('로그인을 다시해야합니다.');
        
        return error
    }
    
}

export default TokenRefresh;