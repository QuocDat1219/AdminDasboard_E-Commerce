import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getAllUser = async () => {
  const response = await axios.get(`${base_url}user/all-users`);
  return response.data;
};

const getAUser = async (id) => {
  const response = await axios.get(`${base_url}user/${id}`, config);

  return response.data;
};

const updateUserAdmin = async (user) => {
  const response = await axios.put(
    `${base_url}user/${user._id}`,
    {
      email: user.userData.email,
      mobile: user.userData.mobile,
      firstname: user.userData.firstname,
      lastname: user.userData.lastname,
      role: user.userData.role,
    },
    config
  );
  return response.data;
};
const adminCreateUser = async () => {
  const response = await axios.post(`${base_url}user/register`);
  return response.data;
};
const deleteUser = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`, config);

  return response.data;
};
const UserService = {
  getAllUser,
  getAUser,
  deleteUser,
  updateUserAdmin,
  adminCreateUser,
};

export default UserService;
