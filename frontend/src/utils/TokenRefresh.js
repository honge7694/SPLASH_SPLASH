import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';


const TokenRefresh = async (token) => {    
    const apiUrl = 'http://localhost:8000/accounts/api/token/refresh/';
    const refreshToken = token;
    const data = { refresh: refreshToken };
    // const history = useNavigate();

    try{
        const response = await Axios.post(apiUrl, data);
        const newToken = response.data.access;
        return newToken;
    }catch(error){
        console.log(error);
        console.log('로그인을 다시해야합니다.')
        notification.open({
            message: '로그인 후 이용해주세요.',
            description: '회원 정보를 확인할 수 없습니다.',
            icon: <FrownOutlined style={{ color: "#fff333" }}/>
        }); 

        // history('/accounts/login');
    }
    
}

export default TokenRefresh;