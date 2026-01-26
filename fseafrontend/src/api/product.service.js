import axiosClient from "./axiosClient";

export const getProducts = (page, size) => {
    return axiosClient.get("/products", {
        params: { page, size }
    });
};

export const deleteProduct = (id) => {
    return axiosClient.put(`/products/${id}/deactivate`);
};

export const updateProduct = (data) => {
    console.log(data);
    return axiosClient.put(`/products`, data);
}

export const createProduct = (data) => {
    return axiosClient.post(`/products`, data);
}


