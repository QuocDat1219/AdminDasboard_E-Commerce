import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url, base_url_vercel } from "../../utils/baseUrl";
const getProducts = async () => {
  const response = await axios.get(`${base_url_vercel}products/getall`);
  console.log(response.data.products);
  return response.data.products;
};
const getAProduct = async (id) => {
  const response = await axios.get(`${base_url_vercel}products/${id}`, config);
  return response.data.product;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}products/`, product, config);
  return response.data;
};
const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}products/${product._id}`,
    product,
    config
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}products/${id}`, config);
  console.log(response);
  return response.data;
};
const productService = {
  getProducts,
  getAProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
