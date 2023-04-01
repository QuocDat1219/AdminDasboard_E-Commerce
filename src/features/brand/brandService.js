import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url} from "../../utils/baseUrl";
import { base_url_vercel } from "../../utils/baseUrl";
const getMenus = async () => {
  const response = await axios.get(`${base_url_vercel}menu/`);
  return response.data.Menu;
};
const getBrands = async () => {
  const response = await axios.get(`${base_url_vercel}menu/`);

  return response.data;
};

const createMenu = async (menu) => {
  const response = await axios.post(`${base_url}menu/`,menu, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteMenu = async (id) => {
  const response = await axios.delete(`${base_url}menu/${id}`, config);

  return response.data;
};

const brandService = {
  getMenus,
  createMenu,
  getBrand,
  updateBrand,
  deleteMenu,
  getBrands,
};

export default brandService;
