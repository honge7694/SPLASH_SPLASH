/* global kakao */
import React, { useEffect } from 'react';


const { kakao } = window;

const DetailMap = ({lat, lng}) => {
    //처음 지도 그리기
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(lat, lng), level: 2 };
        const map = new kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
            lat,
            lng
        );
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
        });

        marker.setMap(map);
        
    }, []);

    return (
        <>
            <div id="map" 
                style={{ width: '99%', height: '400px' }}
            >
            </div>
        </>
    );
}

export default DetailMap;