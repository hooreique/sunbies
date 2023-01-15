import axios from "axios";
import { API_BASE_URL, APT_DEAL_URL } from "@/config";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    // 이건 우리 스프링서버에 요청보내는용
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function houseInstance() {
  const instance = axios.create({
    // 이건 공공데이터베이스에 보내는용
    baseURL: APT_DEAL_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, houseInstance };
