import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api
    .post(`/member/login`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function update(user, success, fail) {
  // console.log("memberjs update안에 success");
  // console.log(success);
  // console.log("memberjs update안에 fail");
  // console.log(fail);
  // console.log("memberjs update안에 들어온 user");
  // console.log(user);
  await api.put(`/member`, JSON.stringify(user)).then(success).then(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/member/info/${userid}`).then(success).catch(fail);
}

const deleteMember = (id) => {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  return api.delete(`/member/${id}`);
};

// function logout(success, fail)

export { login, update, findById, deleteMember };
