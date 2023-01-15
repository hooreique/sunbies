// // 카테고리 검색을 요청하는 함수입니다
// function searchPlaces() {
//   var ps = new kakao.maps.services.Places(map);

//   for (let currCategory in this.categoryList) {
//     // cullCategory는 카테고리 코드들이다.
//     // 이제 이를 이용해서 맵검색을 통해
//     // 결과 배열들을 만들어줄거고
//     // 그걸 다시 저장해준다.
//     // 일단 검색을 해줘야겠지?
//     ps.categorySearch(currCategory, placesSearch, { useMapBouCBnds: true });
//   }
// }

// // const test = function () {
// //   console.log("testFunction안에 들어옴.");
// //   console.log(this.categoryList);
// //   //   alert(message);
// //   for (let category in this.categoryList) {
// //     console.log(category + " " + this.categoryList[category]);
// //     this.categoryList[category].push(category);
// //   }
// // };

// /*
//   ps.categorySearch(currCategory, placesSearchC,{Bnds: true });
//       function placesSearchCB(data, status, pagination) {
//   data의 형태는
//         [{},{}]의 객체배열
//         객체 형태는
//         {
//             "address_name": "서울 중구 을지로1가 101-1",
//             "category_group_code": "BK9",
//             "category_group_name": "은행",
//             "category_name": "금융,보험 > 금융서비스 > 은행 > 하나은행",
//             "distance": "",
//             "id": "8124674",
//             "phone": "1599-1111",
//             "place_name": "하나은행 본점",
//             "place_url": "http://place.map.kakao.com/8124674",
//             "road_address_name": "서울 중구 을지로 35",
//             "x": "126.981866951611",
//             "y": "37.566491371702"
//         }
// */

// export { searchPlaces };
