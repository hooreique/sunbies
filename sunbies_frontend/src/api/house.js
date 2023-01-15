import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/housedeal/sido`).then(success).catch(fail);
}
function gugunList(params, success, fail) {
  api.get(`/housedeal/gugun`, { params: params }).then(success).catch(fail);
}

function dongList(params, success, fail) {
  api.get(`/housedeal/dong`, { params: params }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  api.get(`/housedeal/`, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, houseList };
