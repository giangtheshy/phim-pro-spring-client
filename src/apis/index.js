import axios from "./axios";
axios.defaults.withCredentials = true;

export const loginUser = (user) => axios.post("/auth/login", user);
export const registerUser = (user) => axios.post("/auth/signup", user);
export const verifyAccount = (token) => axios.get(`/auth/accountVerification/${token}`);
export const checkLogin = () => axios.get("/auth/refresh/token");
export const logoutUser = () => axios.delete("/auth/logout");
export const forgotPassword = (email) => axios.get(`/auth/forgot-password/${email}`);
export const resetPassword = (data, token) => axios.post(`/auth/reset-password/${token}`, data);
export const updateAvatar = (avatar) => axios.put("/auth/avatar", avatar);
export const loginGoogle = (user) => axios.post("/auth/login_google", user);
export const loginFacebook = (user) => axios.post("/auth/login_facebook", user);

export const getFavorites = () => axios.get(`/films/get_fav`);
export const getWatched = () => axios.get(`/films/get_wat`);
export const addFavorite = (id) => axios.get(`/films/add_fav/${id}`);
export const addWatched = (id) => axios.get(`/films/add_wat/${id}`);
export const removeFavorite = (id) => axios.get(`/films/remove_fav/${id}`);

export const createFilm = (film) => axios.post("/films/create", film);
export const deleteFilm = (id) => axios.delete(`/films/delete/${id}`);
export const updateFilm = (film) => axios.put(`/films/update`, film);
export const getFilms = () => axios.get("/films/get_all");
export const getSingleFilm = (id) => axios.get(`/films/${id}`);

export const createComment = (comment) => axios.post(`/comments/create`, comment);
export const updateComment = (comment) => axios.put(`/comments/update`, comment);
export const deleteComment = (id) => axios.delete(`/comments/delete/${id}`);
export const getAllComments = (id) => axios.get(`/comments/${id}`);

export const getAllEpisodes = (id) => axios.get(`/episode/${id}`);
export const createEpisode = (episode) => axios.post(`/episode/create`, episode);
export const updateEpisode = (episode) => axios.put(`/episode/update`, episode);
export const deleteEpisode = (id) => axios.delete(`/episode/delete/${id}`);

export const createPayment = () => axios.post("/payment/create");
export const returnVnPay = (query) => axios.get(`/payment/return_vnp${query}`);
