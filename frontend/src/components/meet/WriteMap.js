/* global kakao */
import React, { useEffect, useState } from 'react';
import { SearchOutlined, CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import '../../style/meet/Map.scss';


const { kakao } = window;

const WriteMap = ({ changeLat, changeLng, changePlace, Lat, Lng }) => {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

    let markers = [];

    //처음 지도 그리기
    useEffect(()=>{
        const container = document.getElementById('map');
        console.log('Lat, Lng : ', Lat, Lng)
        const options = { center: new kakao.maps.LatLng(Lat, Lng) };
        console.log(options)
        const map = new kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
                Lat,
                Lng
                // 38.2313466,
                // 128.2139293
        );

        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
        });

        marker.setMap(map);

        // 장소 검색 객체를 생성.
        const ps = new kakao.maps.services.Places();

        // 검색 결과 목록, 마커를 클릭했을 때 장소명을 표출할 마커정보 생성.
        const infoWindow = new kakao.maps.InfoWindow({zIndex:1});

        const searchForm = document.getElementById("submit_btn");
		searchForm?.addEventListener("click", function (e) {
            e.preventDefault();
            searchPlaces();
        });

        const searchPlaces = () => {
            const keyword = document.getElementById("keyword").value;
            
            if (!keyword.replace(/^\s+|\s+$/g, '')){
                alert('키워드를 입력해주세요!');
                return false;
            }

            // 장소검색 객체를 통해 키워드로 장소검색을 요청한다.
            ps.keywordSearch(keyword, placesSearchCB);
        }

        // 키워드로 장소를 검색요청 함수.
        // searchPlaces();
        

        // 장소검색이 완료됐을 때 호출되는 콜백 함수.
        const placesSearchCB = (data, status, pagination) => {
            
            if (status === kakao.maps.services.Status.OK){
                // 정상적으로 검색이 완료되면 목록과 마커 표출.
                displayPlaces(data);

                // 페이지 번호 표출
                displayPagination(pagination);
                
                const bounds = new kakao.maps.LatLngBounds();
                
                for (let i = 0; i < data.length; i++){
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT){
                alert('검색 결과가 존재하지 않습니다.');

            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');

            }
        }

        // 검색 결과 목록과 마커를 표시하는 함수.
        const displayMarker = (place) => {
            const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });
            kakao.maps.event.addListener(marker, "click", function(mouseEvent){
                // props.setAddress(place);
                infoWindow.setContent(`
                    <span>
                        ${place.place_name}
                    </span>
                `);
                infoWindow.open(map, marker);
                const moveLatLon = new kakao.maps.LatLng(place.y, place.x);
                map.panTo(moveLatLon);
            });
        }

        // 검색 결과 목록과 마커를 표출하는 함수.
        const displayPlaces = (places) => {
            const listEl = document.getElementById('placesList');
            const menuEl = document.getElementById('menu_wrap');
            const fragment = document.createDocumentFragment();
            const bounds = new kakao.maps.LatLngBounds();
            
            // 검색 결과 목록에 추가된 항목들을 제거.
            removeAllChildNods(listEl);
        
            // 지도에 표시되고 있는 마커를 제거.
            removeMarker();
            
            for ( let i=0; i<places.length; i++ ) {
        
                // 마커를 생성하고 지도에 표시합니다
                const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                const marker = addMarker(placePosition, i);
                const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);
        
                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function(marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });
        
                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infoWindow.close();
                    });
                    
                    itemEl.addEventListener("click", function (e) {
                        displayInfowindow(marker, title);
                        map.panTo(placePosition);
                        map.setLevel(4, {animate: true});
                        console.log('Lat : ', placePosition.La, 'Lng : ', placePosition.Ma, title);
                        
                        changePlace(title);
                        changeLat(placePosition.Ma);
                        changeLng(placePosition.La);
                    });
                })(marker, places[i].place_name);
        
                fragment.appendChild(itemEl);
            }
        
            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl?.appendChild(fragment);
            // menuEl.scrollTop = 0;
        
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
        }

        // 검색결과 항목을 Element 로 반환하는 함수.
        const getListItem = (index, places) => {
            let el = document.createElement('li');
            let itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + places.place_name + '</h5>';
            
            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' +  places.address_name  + '</span>';
            } else {
                itemStr += '    <span>' +  places.address_name  + '</span>'; 
            }
            itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                        '</div>';           
        
            el.innerHTML = itemStr;
            el.className = 'item';
        
            return el;        
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수.
        const addMarker = (position, idx, title) => {
            let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png' // 마커 이미지 url, 스프라이트 이미지를 사용.
            let imageSize = new kakao.maps.Size(36, 37) // 마커 이미지의 크기.
            let imgOptions = {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset : new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            }
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
            let marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

            marker.setMap(map); // 지도 위에 마커를 표출.
            markers.push(marker); // 배열에 생성된 마커를 추가.

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거.
        const removeMarker = () => {
            for (let i=0; i < markers.length; i++){
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 하단에 페이지 번호를 표시하는 함수.
        const displayPagination = (pagination) => {
            let paginationEl = document.getElementById('pagination')
            let fragment = document.createDocumentFragment()
            let i;

            // 기존에 추가된 페이지 번호를 삭제한다.
            while (paginationEl.hasChildNodes()){
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i=1; i<=pagination.last; i++){
                let el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i===pagination.current){
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }
                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수.
        // 인포윈도우에 장소명을 표시한다.
        const displayInfowindow = (marker, title) => {
            let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수.
        const removeAllChildNods = (el) => {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }

    },[])

    const onchangeSearch = (event) => {
        setSearch(event?.target.value);
    };
    
    const onClickSearchBarOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id="MapSection"
            // style={{
            //     width: '100%',
            //     display: 'inline-block',
            //     marginLeft: '5px',
            //     marginRight: '5px',
            // }}
        >
            <div id="map" 
                // style={{ width: '99%', height: '500px' }}
            >
            </div>
            <div id="menuDiv">
                <div id={isOpen? "show_menu_wrap" : "hide_menu_wrap"} className="bg_white">
                    <div className="option">
                        <div>
                            <div id="map_title">
                                <div>장소검색</div>
                            </div>

                            <div id="form">
                                <input type="text" value={search} id="keyword" onChange={onchangeSearch} />
                                <button id="submit_btn" type="submit">
                                    <SearchOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
                <div id="btnDiv">
                    {isOpen? (
                        <button id="searchBtn" onClick={onClickSearchBarOpen} type='button'>
                            <CaretLeftFilled />
                        </button>
                    ):(
                        <button id="searchBtn" onClick={onClickSearchBarOpen} type='button'>
                            <CaretRightFilled />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

WriteMap.defaultProps = {
    Lat : 38.2313466,
    Lng : 128.2139293
}

export default WriteMap;