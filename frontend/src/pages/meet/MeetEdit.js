import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { useAppContext } from 'store';
import MeetEditForm from 'components/meet/MeetEditForm';

const MeetEdit = () => {
    const [meet, setMeet] = useState();
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    
    useEffect(() => {
        async function fetchMeetData() {
            const apiUrl = `http://localhost:8000/meet/${id}/`;
            try{
                const { data } = await Axios.get(apiUrl, { headers });
                setMeet(data);
            }catch(error){
                console.log(error);
            }
        }

        fetchMeetData();
    },[])

    return (
        <div>
            {meet && <MeetEditForm meet={meet}/>}
        </div>
    )
}

export default MeetEdit;