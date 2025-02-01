import baseApi from "./TokenConfig";

//User
export const signinUser = (data) => baseApi.post("auth/signin/", data);

export const signupUser = (data) => baseApi.post("auth/signup/", data);

export const signoutUser = (token) =>
  baseApi.post("auth/signout/", {
    refresh: token,
  });

export const fetchUser = (token) =>
  baseApi.get("auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//Category
export const fetchCategory = () => baseApi.get("products/categories/");

export const createCategory = (data) =>
  baseApi.post("products/categories/", data);

//Product
export const fetchProducts = () => baseApi.get("products");

export const fetchProduct = (slug) => baseApi.get(`products/${slug}`);

export const createProduct = (data) =>
  baseApi.post("products/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (slug, data) =>
  baseApi.put(`products/${slug}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (slug) => baseApi.delete(`products/${slug}`);

//Search
export const searchProducts = (query) =>
  baseApi.get(`products/search/?query=${query}`);

//Banner
export const getBannerImage = () => baseApi.get("banners/images/");

export const createBannerImage = (data) =>
  baseApi.post("banners/images/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteImage = (id) => baseApi.delete(`banners/images/${id}/`);
