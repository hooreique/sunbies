<template>
  <!-- Kakao Map start -->
  <div>
    <div id="map" ref="map" class="mb-3"></div>
    <!-- style="width: 100%; height: 600px; margin: auto" -->
  </div>
  <!-- Kakao Map end -->
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
const houseStore = "houseStore";

export default {
  // props: ["options"],
  data() {
    return {
      // 아파트 마커배열
      markers: [],
      // 현재 아파트 마커 배열
      aptMarker: null,
      aptBounds: null,
      // 상권마커
      storeMarkers: [],
    };
  },
  created() {
    this.CLEAR_BOUNDS();

    this.RESET_POSITIONS();
  },
  // 마운트는 건드리지않아도됨
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      ////console.log("이미 로딩됨: ", window.kakao);
      this.initMap();
    }
  },
  computed: {
    ...mapState(houseStore, [
      "sidos",
      "guguns",
      "dongs",
      "house",
      "houses",
      "positions",
      "bounds",
      "categoryList",
      "categoryCode",
    ]),
  },
  watch: {
    houses: function () {
      // alert("아파트 리스트 생성, 개수는 " + this.houses.length + "개");
      let positions = [];
      // alert(this.houses.length);
      //console.log(positions);
      this.houses.forEach(function (house) {
        //console.log(house.lat + " " + house.lng);
        let position = [house.lat, house.lng];
        if (
          !positions.some(function (value) {
            if (JSON.stringify(value) === JSON.stringify(position)) {
              return true;
            }
            return false;
          })
        ) {
          //console.log("이 값은 positions에 없으므로 추가해준다.");
          positions.push(position);
        }
      });
      // alert("positions의 사이즈 = " + positions.length);

      if (positions.length == 0) {
        alert("해당하는 데이터가 없습니다.");
      } else {
        this.makeLatLng(positions);
      }
    },
    bounds: function () {
      this.displayMarker();
    },
    house: function () {
      // alert("house watch 들어옴");
      this.SET_CATEGORYCODE(null);
      // alert("SET_CATEGORYCODE 완료");
      // 현재 화면에 뿌려져 있는 모든 상권마커 임시삭제
      this.removeStoreMarkers();
      // alert("removeStoreMarkers 완료");
      console.log(this.markers);
      //console.log("house의 변경 감지, getCategory 시작");
      // 아파트 마커 이동하는 함수 시작
      // 우선 모든 아파트 마커들을 지워준다.
      this.removeMarkers(false);
      // alert("removeMarkers 완료");
      // 그 후 현재 아파트 마커만 찾아서 저장해주고 마커 찍어주고 맵 좌표도 옮겨준다.
      // alert("아파트 마커를 찍어준다.");
      this.aptMarker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(this.house.lat, this.house.lng),
      });
      // alert("바운드를 설정해준다.");
      this.aptBounds = new kakao.maps.LatLng(this.house.lat, this.house.lng);
      // alert(this.aptBounds);
      this.map.setCenter(this.aptBounds);
      // 여기서 카테고리 검색 작업을 시작
      this.getCategory(this.house.lat, this.house.lng);
    },

    categoryCode: function () {
      this.removeStoreMarkers();
      if (this.categoryCode) {
        this.makeCategoryMarkerList();
      }
    },
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_POSITIONS",
      "RESET_POSITIONS",
      "SET_BOUNDS",
      "CLEAR_BOUNDS",
      "SET_CATEGORYLIST_SPECITIC",
      "CLEAR_CATEGORYLIST_SPECITIC",
      "SET_CATEGORYSTATUS",
      "CLEAR_CATEGORYSTATUS",
      "SET_CATEGORYCODE",
    ]),
    ...mapActions(houseStore, ["setMarkers"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2429362, 131.8624647, 16),
        level: 5,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      //console.log("this.map");
      //console.log(this.map);
      // this.SET_MAP(new kakao.maps.Map(container, options));
    },
    getCategory(centerLat, centerLng) {
      // 중심좌표는 37.5861486417138, 126.966930414705
      //console.log("getCategory 들어옴");
      //console.log("this.map");
      //console.log(this.map);
      let ps = new kakao.maps.services.Places(this.map);
      //console.log("ps 생성");
      //console.log(ps);
      // let tempCategory = {};

      for (let currentCategory in this.categoryList) {
        //console.log(currentCategory + "코드 검색 시작");
        //console.log("중심좌표는 " + centerLat + ", " + centerLng);
        // ps.categorySearch(currentCategory, this.placesSearchCB,option);
        ps.categorySearch(
          currentCategory,
          (data, status) => {
            //console.log("콜백함수 placeSearchCB 들어옴");
            if (status === kakao.maps.services.Status.OK) {
              //console.log(status);
              //console.log(data);
              //console.log(currentCategory);
              //console.log(this.categoryList[currentCategory]);
              this.SET_CATEGORYLIST_SPECITIC(data);
              // 모든 검사를 다 마쳤을때
              if (data[0].category_group_code == "CE7") {
                // 이게 트루여야 상권정보를 디스플레이해준다.
                this.SET_CATEGORYSTATUS(true);
              }
              // tempCategory[currentCategory] =
              //   this.categoryList[currentCategory];
              // this.categoryList.{{data[0].category_croup_code}}
              // displayPlaces(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
            } else if (status === kakao.maps.services.Status.ERROR) {
              // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
            }
          },
          {
            location: new kakao.maps.LatLng(centerLat, centerLng),
            // x: centerLat,
            // y: centerLng,
            radius: 500,
            sort: kakao.maps.services.SortBy.distance,
          }
        );
      }
      //console.log("모든 카테고리값 다 넣음");
      //console.log(this.categoryList);
    },
    // 이건 상권마커들만 지워주는 마커관련함수
    removeStoreMarkers() {
      if (this.storeMarkers.length > 0) {
        // this.markers.forEach((marker, index) => {
        this.storeMarkers.forEach((marker) => {
          //console.log(index);
          // if (index != 0)
          marker.setMap(null);
        });
        this.storeMarkers = [];
        // this.markers = this.markers.slice(0, 1);
      }
    },
    makeCategoryMarkerList() {
      //console.log("makeCategoryMarkerList 들어옴");
      //console.log("this.categoryCode = ");
      //console.log(this.categoryCode);
      // for (const property in object) {
      // //console.log(`${property}: ${object[property]}`);
      // }
      let selectedCategoryList;
      for (let category in this.categoryList) {
        // //console.log(this.categoryList[category]);
        if (this.categoryList[category].length > 0) {
          // 객체가 있다는걸로 판단
          // alert(this.categoryList[category][0].category_group_code);
          if (
            this.categoryList[category][0].category_group_code ===
            this.categoryCode
          ) {
            // alert("같은거 발견");
            // alert(this.categoryList[category]);
            selectedCategoryList = this.categoryList[category];
            break;
          }
        }
      }
      //console.log("selectedCategoryList = ");
      //console.log(selectedCategoryList);
      //console.log(
      // "이제 해당하는 리스트를 찾았으니 이걸 가지고 인포윈도우를 가진 마커 생성"
      // );
      this.makeStoreMarker(selectedCategoryList);
    },
    // 인포윈도우 지우기
    closeInfowindow() {
      // if (infowindow) {
      //   infowindow.setMap(null);
      //   infowindow = null;
      // }
    },

    makeStoreMarker(places) {
      let tempPositions = [];
      //console.log(
      ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^makeStoreMarker에 들어온 places^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      // );
      //console.log(places);
      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let marker = this.addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          places[i].place_name
        );
        this.storeMarkers.push(marker);
        let position = new kakao.maps.LatLng(places[i].y, places[i].x);
        tempPositions.push(position);
        //console.log(
        ("#####################상권 마커설정 반복문에서의 tempmarker#######################################################");
        // );
        //console.log(tempmarkers);
        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        // 근데 왜 상권정보 버튼을 실행하자마자 이게뜨는거지?
        // this.infowindow = (function (marker, place) {
        // this.infowindow = new kakao.maps.InfoWindow({
        //   map: this.map, // 인포윈도우가 표시될 지도
        //   position,
        //   content: `<div style="padding:5px;">${places[i].place_name}</div>`,
        //   removable: true,
        // });
        var infowindow = null;
        // ((marker, place) => {
        ((marker, place) => {
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            () => {
              // if (infowindow) {
              //   infowindow.setMap(null);
              //   infowindow = null;
              // }

              // HTMLElement
              var wrap = document.createElement("div");
              wrap.className = "wrap";

              var info = document.createElement("div");
              info.className = "info";
              wrap.appendChild(info);

              var title = document.createElement("h5");
              title.className = "title";
              info.appendChild(title);
              title.textContent = place.place_name;

              // var close = document.createElement("div");
              // close.className = "close";
              // close.setAttribute("v-bind:onclick", "closeInfowindow");
              // close.setAttribute("v-bind:onclick", "closeInfowindow()");
              // close.setAttribute("@click", "closeInfowindow()");
              // close.setAttribute("title", "닫기");
              // close.onclick = function () {
              // infowindow.setMap(null);
              // };
              // title.appendChild(close);

              var body = document.createElement("div");
              body.className = "body";
              info.appendChild(body);

              var img = document.createElement("div");
              img.className = "img";
              body.appendChild(img);

              var mainImg = document.createElement("img");
              mainImg.setAttribute(
                "src",
                document
                  .getElementById(place.category_group_code)
                  .getAttribute("src")
                // "/img/MT1.2f66b3d8.png"
                // "https://cfile181.uf.daum.net/image/250649365602043421936D"
              );
              mainImg.setAttribute("width", "73");
              mainImg.setAttribute("height", "70");
              img.appendChild(mainImg);

              var desc = document.createElement("div");
              desc.className = "desc";
              body.appendChild(desc);

              var ellipsis = document.createElement("div");
              ellipsis.className = "ellipsis";
              ellipsis.textContent = place.address_name;
              desc.append(ellipsis);

              var jibun_ellipsis = document.createElement("div");
              jibun_ellipsis.className = "jibun ellipsis";
              jibun_ellipsis.textContent = place.road_address_name;
              desc.append(jibun_ellipsis);

              var div = document.createElement("div");
              var link = document.createElement("div");
              link.className = "link";
              // link.setAttribute("href", "https://www.kakaocorp.com/main");
              // link.setAttribute("target", "_blank");
              link.textContent = place.phone;
              div.appendChild(link);
              desc.appendChild(div);
              infowindow = new kakao.maps.CustomOverlay({
                map: this.map, // 인포윈도우가 표시될 지도
                position,
                content: wrap,
              });
            },
            kakao.maps.event.addListener(marker, "mouseout", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              // infowindow.close();
              infowindow.setMap(null);
              infowindow = null;
            })
          );
        })(marker, places[i]);

        // (함수)(인자)

        //console.log(
        // "#####################상권 마커 설정에서의 marker#######################################################"
        // );
        //console.log(tempmarkers);
      }

      // reduce함수는 배열의 각 요서에 대해 주어진 함수를 실행하고 하나의 결과값을 반환한다.
      // 여기있는 tempPositions는 가게들의 위치정보들만 담고있다는 단점이 있다
      // 하여 현재 아파트 위치에 대한 정보도 여기에 임시 추가하여 바운드를 같이 찾아줄 필요성이 있다
      // 그러기 위해서 아파트의 위치, 마커, 등등의 정보도 따로 저장해 줄 필요가 있어보인다.
      const bounds = tempPositions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );
      // this.SET_BOUNDS(bounds);
      this.map.setBounds(bounds);
    },
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    // addMarker(position, placeName) {
    addMarker(position) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(24, 35), // 마커 이미지의 크기
        // imgOptions = {
        //   spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        //   spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        //   offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        // },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
          clickable: true, // 마커를 클릭했을때 지도의 클릭이벤트가 발생하지 ㅇ낳도록 함
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다
      //console.log("마커 다 찍었음");
      //console.log(this.markers);
      return marker;
    },

    displayPlaceInfo(place) {
      // alert("displayPlaceInfo 들어왔음");
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";
      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }
      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';
      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
      //console.log(content);
      this.infowindow.push(
        new kakao.maps.InfoWindow({
          map: this.map, // 인포윈도우가 표시될 지도
          position: new kakao.maps.LatLng(place.x, place.y),
          content: '<div style="padding:5px;">Hello World!</div>',
          removable: true,
        })
      );
    },

    makeLatLng(markerPositions) {
      // 마커의 위치들을 포지션 배열 안에 넣어준다.
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );
      // [qa, qa, qa]
      // qa {La: 126.989525786594, Ma: 37.5951865180577}
      // alert("makeLatLng에서 만들어진 positions " + positions.length);
      //console.log(positions);
      // 마커의 위치들을 포지션 배열 안에 넣어준다.
      this.SET_POSITIONS(positions);
      //console.log("SET_MARKERS결과  positions");
      //console.log(positions);

      // 가운데 위치 찾기
      //console.log(
      // "#####################바운드를 찾는 포지션 함수형태#########################################################"
      // );
      //console.log(positions);
      // (10)[{…},{…},{…},{…},{…},{…},{…},{…},{…},{…},__ob__:Observer]

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );
      this.SET_BOUNDS(bounds);
      // this.map.setBounds(bounds);
    },
    displayMarker() {
      // 일단 맵에 있는 마커들을 다 지워준다.
      this.removeMarkers();
      // 넣었던 마커들의 개수가 하나라도 있다면
      // 액션에 넣어준다?
      if (this.positions.length > 0) {
        // this.setMarkers(positions);
        //console.log("스토어의 마커스 안에 positions를 넣어준다.");
        this.markers = this.positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );
        this.map.setBounds(this.bounds);
      }
    },
    // 아파트 마커들 삭제
    removeMarkers(aptMarkerStatus = true) {
      // 우선 뿌려진 전체 아파트 배열들을 삭제해준다.
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      // 그 후 만약 aptMarkerStatus로 null값이 들어온다면 아파트배열과 아파트마커도 초기화해준다.
      if (!aptMarkerStatus) {
        this.markers = [];
        if (this.aptMarker) {
          this.aptMarker.setMap(null);
        }
        this.aptMarker = aptMarkerStatus;
      }
    },
  },
};
</script>

<style scopped>
#map {
  width: 100%;
  height: 500px;
}
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
