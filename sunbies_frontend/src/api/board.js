import { apiInstance } from "./index.js";

const api = apiInstance();

const list = function ({ boardtype, searchparams }, success, fail) {
  api
    .get(`/board/${boardtype}`, {
      params: { ...searchparams },
    })
    .then(success)
    .catch(fail);
};

const select = function (postno, success, fail) {
  api.get(`/post/${postno}`).then(success).catch(fail);
};

const insert = function (postDto) {
  return api.post(`/post`, JSON.stringify(postDto));
};

const update = function (postDto) {
  return api.put(`/post`, JSON.stringify(postDto));
};

const del = function (postno) {
  return api.delete(`/post/${postno}`);
};

const insertReply = function (replyDto) {
  return api.post(`/reply`, JSON.stringify(replyDto));
};

const deleteReply = function (replyno) {
  return api.delete(`/reply/${replyno}`);
};

const selectLike = function (postno, id) {
  return api.get(`/post/${postno}/${id}/position`);
};

const insertLike = function (postno, id, position) {
  return api.post(`/post/${postno}/${id}/${position}`);
};

const updateLike = function (postno, id, position) {
  return api.put(`/post/${postno}/${id}/${position}`);
};

const deleteLike = function (postno, id) {
  return api.delete(`/post/${postno}/${id}/position`);
};

export {
  list,
  select,
  insert,
  update,
  del,
  insertReply,
  deleteReply,
  selectLike,
  insertLike,
  updateLike,
  deleteLike,
};

// function listArticle(param, success, fail) {
//   api.get(`/board`, { params: param }).then(success).catch(fail);
// }

// function writeArticle(article, success, fail) {
//   api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
// }

// function getArticle(articleno, success, fail) {
//   api.get(`/board/${articleno}`).then(success).catch(fail);
// }

// function modifyArticle(article, success, fail) {
//   api
//     .put(`/board/${article.articleno}`, JSON.stringify(article))
//     .then(success)
//     .catch(fail);
// }

// function deleteArticle(articleno, success, fail) {
//   api.delete(`/board/${articleno}`).then(success).catch(fail);
// }

// export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
