import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  createUser,
  getAUser,
  resetState,
  updateUserAdmin,
} from "../features/user/userSlice";
import { get } from "immutable";

let schema = yup.object().shape({
  email: yup.string().required("Chưa nhập email"),
  phone: yup.string().required("Chưa nhập số điện thoại"),
  firstname: yup.string().required("Chưa nhập họ"),
  lastname: yup.string().required("Chưa nhập tên"),
  role: yup.string().required("Chưa nhập quyền"),
});

const AddUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getIdUser = location.pathname.split("/")[2];
  const newUser = useSelector((state) => state.users);
  const {
    isSuccess,
    isError,
    isLoading,
    createdUser,
    email,
    phone,
    firstname,
    lastname,
    role,
    updatedUser,
  } = newUser;

  useEffect(() => {
    if (getIdUser !== undefined) {
      dispatch(getAUser(getIdUser));
    } else {
      dispatch(resetState());
    }
  }, [getIdUser]);

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success("Thêm người dùng thành công!");
      dispatch(resetState());
    }
    if (isSuccess && updatedUser) {
      toast.success("Sửa người dùng thành công!");
    }
    if (isError) {
      toast.warning("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email || "",
      phone: phone || "",
      firstname: firstname || "",
      lastname: lastname || "",
      role: role || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getIdUser, userData: values };
      console.log(getIdUser);
      if (getIdUser !== undefined) {
        dispatch(updateUserAdmin(data));
        dispatch(resetState());
      } else {
        dispatch(createUser(values));
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
        {getIdUser !== undefined ? "Sửa" : "Thêm"} Người dùng
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <label className="text-medium font-bold pt-3">Email</label>
          <CustomInput
            type="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
            label="Nhập tên người dùng"
            id="brand"
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <label className="text-medium font-bold pt-3">Số điện thoại</label>
          <CustomInput
            type="number"
            name="phone"
            onChng={formik.handleChange("phone")}
            onBlr={formik.handleBlur("phone")}
            val={formik.values.phone}
            label="Nhập tên người dùng"
            id="brand"
          />
          <div className="error">
            {formik.touched.phone && formik.errors.phone}
          </div>
          <label className="text-medium font-bold pt-3">
            Nhập họ người dùng
          </label>
          <CustomInput
            type="text"
            name="firstname"
            onChng={formik.handleChange("firstname")}
            onBlr={formik.handleBlur("firstname")}
            val={formik.values.firstname}
            label="Nhập họ người dùng"
            id="firstname"
          />
          <div className="error">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <label className="text-medium font-bold pt-3">
            Nhập tên người dùng
          </label>
          <CustomInput
            type="text"
            name="lastname"
            onChng={formik.handleChange("lastname")}
            onBlr={formik.handleBlur("lastname")}
            val={formik.values.lastname}
            label="Nhập tên người dùng"
            id="lastname"
          />
          <div className="error">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          {/* <label className="text-medium font-bold pt-3">Nhập quyền</label>
        <CustomInput
          type="text"
          name="role"
          onChng={formik.handleChange("role")}
          onBlr={formik.handleBlur("role")}
          val={formik.values.role}
          label="Quyền"
          id="brand"
        />
        <div className="error">{formik.touched.role && formik.errors.role}</div> */}
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getIdUser !== undefined ? "Sửa" : "Thêm"} Người dùng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
