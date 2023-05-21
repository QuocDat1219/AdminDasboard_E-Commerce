import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  createUserMoi,
  getAUser,
  resetState,
  updateUserAdmin,
} from "../features/user/userSlice";

let schema = yup.object().shape({
  email: yup.string().required("Chưa nhập email"),
  mobile: yup.string().required("Chưa nhập số điện thoại"),
  firstname: yup.string().required("Chưa nhập tên"),
  lastname: yup.string().required("Chưa nhập họ"),
  isBlocked: yup.boolean().required("IsBlocked is Required"),
  role: yup.string().required("Chưa nhập quyền"),
});

const AddUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getUserID = location.pathname.split("/")[2];
  const newUser = useSelector((state) => state.users);
  const {
    isSuccess,
    isError,
    isLoading,
    createdUser,
    email,
    mobile,
    firstname,
    lastname,
    role,
    isBlocked,
    updatedUser,
  } = newUser;

  useEffect(() => {
    if (getUserID !== undefined) {
      dispatch(getAUser(getUserID));
    } else {
      dispatch(resetState());
    }
  }, [getUserID]);

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success("Thêm nhãn hàng thành công!");
      dispatch(resetState());
    }
    if (isSuccess && updatedUser) {
      toast.success("Sửa nhãn hàng thành công!");
    }
    if (isError) {
      toast.warning("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email || "",
      mobile: mobile || "",
      isBlocked: isBlocked || "",
      firstname: firstname || "",
      lastname: lastname || "",
      role: role || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert("aaaa");
      console.log(values);
      const data = { id: getUserID, userData: values };
      if (getUserID !== undefined) {
        dispatch(updateUserAdmin(data));
        dispatch(resetState());
      } else {
        dispatch(createUserMoi(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title text-xl font-bold">
        {getUserID !== undefined ? "Sửa" : "Thêm"} Người Dùng
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
            label="Nhập email"
            id="email"
          />
          <CustomInput
            type="text"
            name="mobile"
            onChng={formik.handleChange("mobile")}
            onBlr={formik.handleBlur("mobile")}
            val={formik.values.mobile}
            label="Nhập số điện thoại"
            id="mobile"
          />
          <CustomInput
            type="text"
            name="firstname"
            onChng={formik.handleChange("firstname")}
            onBlr={formik.handleBlur("firstname")}
            val={formik.values.firstname}
            label="Nhập firstname"
            id="firstname"
          />
          <CustomInput
            type="text"
            name="lastname"
            onChng={formik.handleChange("lastname")}
            onBlr={formik.handleBlur("lastname")}
            val={formik.values.lastname}
            label="Nhập lastname"
            id="lastname"
          />
          <select
            name="isBlocked"
            onChange={formik.handleChange("isBlocked")}
            onBlur={formik.handleBlur("isBlocked")}
            value={formik.values.isBlocked}
            className="form-control py-3 mb-3"
            id=""
          >
            <option disabled>Select Status</option>
            <option value={false}>Active</option>
            <option value={true}>Block</option>
          </select>
          <div className="error">
            {formik.touched.isBlocked && formik.errors.isBlocked}
          </div>

          <select
            name="role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
            value={
              formik.values.role === "personnel"
                ? "personnel"
                : formik.values.role === "admin"
                ? "admin"
                : formik.values.role === "user"
                ? "user"
                : ""
            }
            className="form-control py-3 mb-3"
            id=""
          >
            <option disabled>Select Status</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="personnel">Personnel</option>
          </select>
          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getUserID !== undefined ? "Sửa" : "Thêm"} Người dùng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
