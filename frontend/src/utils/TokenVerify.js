import { useEffect } from 'react';
import Axios from 'axios';
import { useAppContext } from 'store';
import TokenRefresh from './TokenRefresh';


const TokenVerify = async (token) => {    
    const jwtToken = token['jwtToken'];
    const data = { token: jwtToken };
    const apiUrl = 'http://localhost:8000/accounts/api/token/verify/';
    const refreshToken = token['refreshToken'];

    try{
        const response = await Axios.post(apiUrl, data);
        console.log(response);
    }catch(error){
        const newToken = TokenRefresh(refreshToken);
        return newToken;
        // console.log(error);
    }
    
}

export default TokenVerify;