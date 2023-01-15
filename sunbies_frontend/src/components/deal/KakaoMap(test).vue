<!-- <template>
  <div>
    <div id="map"></div>
    <div class="button-group">
       <button @click="changeSize(0)">Hide</button> 
       <button @click="changeSize(400)">show</button> -->
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "kakaoMap",
  data() {
    return {
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
      infowindow: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e101aade9ddda9b976ab5f7cf0b79023";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    // changeSize(size) {
    //   const container = document.getElementById("map");
    //   container.style.width = `${size}px`;
    //   container.style.height = `${size}px`;
    //   this.map.relayout();
    // },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      // [[37.499590490909185, 127.0263723554437],...] 형태의 배열을 받아서
      // positions라는 새로운 배열에
      // LatLng 형태의 [qa, qa, qa]배열로 바꿔준다.
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );
      // console.log(positions);
      // 그 후 포지션배열에 위치값이 들어가있다고 판단되면
      // 데이터에 저장되어있는 마커스에 마커 배열을 찍어준다.
      // this.markers의 배열은 [v, v, v, v, v, v, v, __ob__: Observer]형태이다.
      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              clickable: true,
            })
        );
        // this.infowindow = new kakao.maps.InfoWindow({
        // map: this.map, // 인포윈도우가 표시될 지도
        // position: iwPosition,
        // content: iwContent,
        // removable: iwRemoveable,
        // });
        console.log(positions.length);
        console.log(this.infowindow);
        // 마커를 생성함과 동시에 인포 윈도우 뜬다.
        // 다만 마커 지워줄때 infowindow도 지워줘야할듯하다.
        // for (let index = 0; index < positions.length; index++) {
        //   console.log(this.infowindow);
        //   this.infowindow.push(
        //     new kakao.maps.InfoWindow({
        //       map: this.map,
        //       position: positions[index],
        //       content: " 인포윈도우",
        //     })
        //   );
        // }
        console.log(this.infowindow);
        // 이번엔 클릭했을때만 뜨도록 해보자
        for (let index = 0; index < positions.length; index++) {
          this.infowindow.push(
            (function (marker) {
              alert("리스너 실행" + marker);
            })(this.markers[index])
          );
        }

        console.log(this.infowindow);
        (function (inputMarkers, inputPositions) {
          for (let index; index < inputPositions.length; index++) {
            kakao.maps.event.addListener(inputMarkers[index], "click", () => {
              alert(inputPositions[index]);
            });
          }
        })(this.markers, positions);
        // alert("마커 생성");
        // console.log(this.markers);
        // 바운드는 positions배열을 받아 계산해야한다.
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );
        // 그 후에 그 바운드를 맵에 반영해준다.
        // alert("지도에 바운드 반영하기 전");
        this.map.setBounds(bounds);
        // alert("지도에 바운드 반영한 후");
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<style scoped>
#map {
  width: auto;
  height: 400px;
}
</style> -->
