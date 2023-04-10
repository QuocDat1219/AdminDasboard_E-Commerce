import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
let schema = yup.object().shape({
  name: yup.string().required("Bạn chưa nhập tên danh mục"),
  idCategoriesContainer: yup.string().required("Bạn chưa nhập danh mục lớn"),
});
const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    name,
    updatedCategory,
    idCategoriesContainer,
  } = newCategory;
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Thêm danh mục thành công!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Cập nhật danh mục thành công!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Đã xảy ra sự cố!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      idCategoriesContainer: idCategoriesContainer || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4 text-xl font-bold">
        {getPCatId !== undefined ? "Sửa" : "Thêm"} Danh Mục
      </h3>
      <div>
        <form
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <input
            type="text"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
            placeholder="Nhập danh mục sản phẩm"
            className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
          />
          {/* <div className="error">
            {formik.touched.name && formik.errors.name}
          </div> */}
          {/* <CustomInput
            type="text"
            label="Nhập danh mục sản phẩm"
            onChng={formik.handleChange("idCategoriesContainer")}
            onBlr={formik.handleBlur("idCategoriesContainer")}
            val={formik.values.idCategoriesContainer}
            id="idCategoriesContainer"
          /> */}
          {/* <div className="error">
            {formik.touched.idCategoriesContainer &&
              formik.errors.idCategoriesContainer}
          </div> */}
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getPCatId !== undefined ? "Sửa" : "Thêm"} Loại danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
