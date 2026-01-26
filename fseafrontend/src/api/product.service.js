import axiosClient from "./axiosClient";

export const getProducts = (page, size) => {
    return axiosClient.get("/products", {
        params: { page, size }
    });
};
