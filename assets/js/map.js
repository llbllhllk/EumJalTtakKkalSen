// Element
const container = document.getElementById('map');
const recommandStoreBtn = document.querySelector('.recommand__store-btn');
const recommandList = document.querySelector('.bg_white');

var mapOption = { 
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};

/* 아래 코드는 'Kakao 지도 Web API Sample'에서 '지도 생성하기'를 참고하여 작성한 코드이다.
https://apis.map.kakao.com/web/sample/basicMap/ */
// 사용자의 위치를 불러온다.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var locPosition = new kakao.maps.LatLng(lat, lon);
    map.setCenter(locPosition);
  });
}

var markers = []; // 생성한 마커를 정의하는 배열이다.
var map = new kakao.maps.Map(container, mapOption); // 지도 생성한다.
var ps = new kakao.maps.services.Places();  // 장소 검색 키워드를 정의하는 객체이다.
var infowindow = new kakao.maps.InfoWindow({zIndex:1}); // 장소 정보를 출력하기 위한 infowindow이다.

/* 아래 코드는 'Kakao 지도 Web API Sample'에서 '마커 생성하기'를 참고하여 작성한 코드이다.
https://apis.map.kakao.com/web/sample/basicMarker/*/
// 사용자의 위치를 기반으로 마커를 생성하고 지도 위에 표시한다.
function addMarker(position, idx, title, map, marker) {
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 쓴다.
    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
    imgOptions =  {
      spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
      position: position,
      image: markerImage 
    });
  marker.setMap(map); // 지도 위에 마커를 표출한다.
  markers.push(marker);  // 배열에 생성된 마커를 추가한다.
  return marker;
}

// '맛집추천' 버튼을 클릭했을 경우 추천받은 음식을 키워드로 맛집을 검색한다.
recommandStoreBtn.addEventListener('click', searchPlaces);

/* 아래 코드는 'Kakao 지도 Web API Sample'에서 '키워드로 장소검색하고 목록으로 표출하기'를 참고하여 작성한 코드이다.
https://apis.map.kakao.com/web/sample/keywordList/ */
function searchPlaces() {
  recommandList.style.display = "block";
  // 장소검색 객체를 통해 키워드로 장소검색을 요청한다.
  ps.keywordSearch(recommandKeyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수이다.
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);
    // 페이지 번호를 표출합니다
    displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 존재하지 않습니다.');
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 결과 중 오류가 발생했습니다.');
    return;
  }
}

// 검색 결과 목록과 마커를 표출한다.
function displayPlaces(places) {
  var listEl = document.getElementById('placesList'), 
  menuEl = document.getElementById('menu_wrap'),
  fragment = document.createDocumentFragment(), 
  bounds = new kakao.maps.LatLngBounds(), 
  listStr = '';

  // 검색 결과 목록에 추가된 항목들을 제거한다.
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거한다.
  removeMarker();
  
  for (var i = 0; i < places.length; i++ ) {
    // 마커를 생성하고 지도에 표시한다.
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i), 
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성한다.

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가한다.
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시한다.
    // mouseout 했을 때는 인포윈도우를 닫는다.
    (function(marker, title) {
      kakao.maps.event.addListener(marker, 'mouseover', function() {
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });
      
      itemEl.onmouseover =  function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout =  function () {
        infowindow.close();
      };
    })(marker, places[i].place_name);
    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가한다.
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정한다.
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환한다.
function getListItem(index, places) {

  var el = document.createElement('li'),
  itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
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

// 마커를 생성하고 지도 위에 마커를 표시한다.
function addMarker(position, idx, title) {
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 쓴다.
    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
    imgOptions =  {
      spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage 
    });
  marker.setMap(map); // 지도 위에 마커를 표출한다.
  markers.push(marker);  // 배열에 생성된 마커를 추가한다.
  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거한다.
function removeMarker() {
  for ( var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }   
  markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시한다.
function displayPagination(pagination) {
  var paginationEl = document.getElementById('pagination'),
    fragment = document.createDocumentFragment(),
    i;
  // 기존에 추가된 페이지번호를 삭제한다.
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild (paginationEl.lastChild);
  }

  for (i=1; i<=pagination.last; i++) {
    var el = document.createElement('a');
    el.href = "#";
    el.innerHTML = i;
    if (i===pagination.current) {
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

// 검색결과 목록 또는 마커를 클릭했을 때 호출한다.
// 인포윈도우에 장소명을 표시한다.
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
  infowindow.setContent(content);
  infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거한다.
function removeAllChildNods(el) {   
  while (el.hasChildNodes()) {
    el.removeChild (el.lastChild);
  }
}