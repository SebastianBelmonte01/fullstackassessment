import axiosClient from "./axiosClient.js";

export const getUsers = () => {
    return axiosClient.get("/users", {});
};