import { apiInstance } from "./index.js";

const api = apiInstance();

const getLatestDeals = () => api.get(`/main/latestdeals`);

const getLatestPosts = () => api.get(`/main/latestposts`);

const getHotPosts = () => api.get(`/main/hotposts`);

export { getLatestDeals, getLatestPosts, getHotPosts };
