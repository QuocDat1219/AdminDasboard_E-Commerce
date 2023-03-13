import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url, base_url_vercel } from "../../utils/baseUrl";
const getProducts = async () => {
  const response = await axios.get(`${base_url_vercel}products/`);
  // console.log(response.data.products)
  return response.data.products;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
