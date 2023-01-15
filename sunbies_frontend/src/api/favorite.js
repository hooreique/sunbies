import { apiInstance } from "./index.js";

const api = apiInstance();

const listFavorite = (id) => api.get(`/member/${id}/house/favorites`);

const countFavorite = (aptCode) => api.get(`/house/${aptCode}/fcount`);

const checkFavorite = ({ id, aptCode }) =>
  api.get(`/member/${id}/house/${aptCode}/position`);

const insertFavorite = ({ id, aptCode }) =>
  api.post(`/member/${id}/house/${aptCode}`);

const deleteFavorite = ({ id, aptCode }) =>
  api.delete(`/member/${id}/house/${aptCode}`);

export {
  listFavorite,
  countFavorite,
  checkFavorite,
  insertFavorite,
  deleteFavorite,
};
