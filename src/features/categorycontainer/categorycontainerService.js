import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url, base_url_vercel } from "../../utils/baseUrl";

const getcategorycontainer = async () => {
  const response = await axios.get(`${base_url_vercel}categorycontainer`);
  return response.data;
};
// const createProduct = async (product) => {
//   const response = await axios.post(
//     `${base_url}categorycontainer/`,
//     product,
//     config
//   );
//   return response.data;
// };
// const deleteProduct = async (id) => {
//   const response = await axios.delete(
//     `${base_url}categorycontainer/${id}`,
//     config
//   );

//   return response.data;
// };
const categorycontainerService = {
  getcategorycontainer,
  //   createProduct,
  //   deleteProduct,
};

export default categorycontainerService;
