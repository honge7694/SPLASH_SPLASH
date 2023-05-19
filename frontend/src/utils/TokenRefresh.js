import { axiosInstance } from 'api';


const TokenRefresh = async (token) => {    
    const apiUrl = '/accounts/api/token/refresh/';
    const refreshToken = token;
    const data = { refresh: refreshToken };

    try{
        const response = await axiosInstance.post(apiUrl, data);
        const newToken = response.data.access;
        return newToken;
    }catch(error){
        console.log(error);
        console.log('로그인을 다시해야합니다.');
        
        return error
    }
    
}

export default TokenRefresh;