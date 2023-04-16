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
      email: user.data.email,
      mobile: user.data.mobile,
      firstname: user.data.firstname,
      lastname: user.data.lastname,
    },
    config
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`, config);

  return response.data;
};
const ContactService = {
  getAllUser,
  getAUser,
  deleteUser,
  updateUserAdmin,
};

export default ContactService;
