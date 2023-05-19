import TokenRefresh from './TokenRefresh';
import { axiosInstance } from 'api';


const TokenVerify = async (token) => {    
    const jwtToken = token['jwtToken'];
    const data = { token: jwtToken };
    const apiUrl = '/accounts/api/token/verify/';
    const refreshToken = token['refreshToken'];

    try{
        const response = await axiosInstance.post(apiUrl, data);
        console.log(response);
        return response.status;
    }catch(error){
        console.log(error);
        const newToken = TokenRefresh(refreshToken);
        return newToken;
    }
    
}

export default TokenVerify;