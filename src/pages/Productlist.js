import React, { useEffect, useState } from "react";
import { Input, Modal, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateProduct,
  deleteAProduct,
  resetState,
} from "../features/product/productSlice";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
// import { getAProductCategory } from "../features/pcategory/pcategorySlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getCategoryContainer } from "../features/categorycontainer/categorycontainerSlice";
import { getMenus } from "../features/brand/brandSlice";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
} from "antd";
import Dropzone from "react-dropzone";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  idBrand: yup.string().required("Brand is Required"),
  idCategory: yup.string().required("Category is Required"),
  idContainerCategory: yup.string().required("ContainerCategory is Required"),
  // color: yup
  //   .array()
  //   .min(1, "Pick at least one color")
  //   .required("Color is Required"),
  // quantity: yup.number().required("Quantity is Required"),
});
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Tên",
    dataIndex: "name",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Đã bán",
    dataIndex: "sold",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Loại hàng hóa",
    dataIndex: "idCategory",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Danh mục",
    dataIndex: "idContainerCategory",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Nhãn hàng",
    dataIndex: "brand",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Ảnh sản phẩm",
    dataIndex: "url",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];
const Productlist = () => {
  const productStates = useSelector((state) => state.product.products);
  const pCategory = useSelector((state) => state.pCategory.pCategories);
  const brands = useSelector((state) => state.brands.menus);

  const categorycontainer = useSelector(
    (state) => state.categorycontainer.categorycontainer
  );

  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const brandState = useSelector((state) => state.brands.menus);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productStates?.length === 0) {
      dispatch(getProducts());
    }
    dispatch(getCategories());
    dispatch(getCategoryContainer());
    dispatch(getMenus());
  }, [dispatch, productStates?.length, pCategory?.length, brands?.length]);
  const data1 = [];
  const [popdtProduct, setProduct] = useState([]);
  const [popdtCategory, setdtCategory] = useState([]);
  const [popCateContainer, setCateContainer] = useState([]);
  const [popBrand, setBrand] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: popdtProduct ? popdtProduct?.name : "",
      price: "",
      description: "",
      idCategory: "",
      idContainerCategory: "",
      idBrand: "",
      imagesDetail: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateProduct(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  console.log(productStates.length);
  // console.log(productStates, pCategory);

  const popProduct = (data) => {
    setProduct(data);
  };
  const popCategory = (data) => {
    setdtCategory(data);
  };

  useEffect(() => {});

  const handleUpdate = async (data) => {
    await console.log(data);
    dispatch(updateProduct(data));
  };
  const handleDelete = (id) => {
    dispatch(deleteAProduct(id));
    //  dispatch(getProducts());
    //  dispatch(getCategories());
  };
  // console.log(brands);
  // console.log(categorycontainer);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  productStates?.map((productState, i) => {
    pCategory?.map((pCate) => {
      if (productState?.idCategory == pCate?._id) {
        const cateContainer = categorycontainer.filter((ct) => {
          return ct._id == productState.idContainerCategory;
        });
        const brand = brands.filter((brand) => {
          return brand._id == productState.idBrand;
        });
        data1.push({
          key: i + 1,
          id: productState._id ? productState._id : "undefined",
          name: productState.name ? productState.name : "undefined",
          price: productState.price ? productState.price : "undefined",
          description: productState.description
            ? productState.description
            : "undefined",
          quantity: productState.quantity ? productState.quantity : "undefined",
          idCategory: pCate.name ? pCate.name : "undefined",
          slug: productState.slug ? productState.slug : "undefined",
          sold: productState?.sold != null ? productState.sold : "undefined",
          brand: brand[0]?.title != null ? brand[0].title : "undefined",
          idContainerCategory: cateContainer[0]?.name
            ? cateContainer[0].name
            : "undefined",

          url: (
            <img
              className="w-20 object-cover"
              src={productState?.imagesDefault}
            />
          ),
          action: (
            <>
              <span
                onClick={() => {
                  setshowModalEdit(true);
                  popProduct(productState);
                }}
                className=" fs-3 text-danger cursor-pointer"
              >
                <BiEdit />
              </span>
              <span
                className="ms-3 fs-3 text-danger cursor-pointer"
                onClick={() => {
                  setshowModalDelete(true);
                  popProduct(productState);
                  popCategory(pCate);
                }}
              >
                <AiFillDelete />
              </span>
            </>
          ),
        });
      }
    });
  });

  console.log(data1);

  return (
    <div>
      {showModalDelete ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setshowModalDelete(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex justify-center flex-col ">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Xóa :{" "}
                      <span className="text-lg text-gray-500">
                        {popdtProduct?.name}
                      </span>
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Bạn chắc chắn muốn xóa {popdtProduct?.name}
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          handleDelete(popdtProduct?._id);
                          setshowModalDelete(false);
                        }}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 bg-success rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setshowModalDelete(false)}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModalEdit ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setshowModalEdit(false)}
            ></div>
            <div className="flex items-center min-h-screen px-1 py-2">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex justify-center flex-col ">
                  <div className="mt-2  sm:ml-4 sm:text-left">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex gap-3 flex-column"
                    >
                      <CustomInput
                        type="text"
                        label="Enter Product Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                      <div className="">
                        <ReactQuill
                          theme="snow"
                          name="description"
                          onChange={formik.handleChange("description")}
                          value={formik.values.description}
                        />
                      </div>
                      <div className="error">
                        {formik.touched.description &&
                          formik.errors.description}
                      </div>
                      <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                      />
                      <div className="error">
                        {formik.touched.price && formik.errors.price}
                      </div>
                      <select
                        name="idBrand"
                        onChange={formik.handleChange("idBrand")}
                        onBlur={formik.handleBlur("idBrand")}
                        value={formik.values.idBrand}
                        className="form-control py-3 mb-3"
                        id=""
                      >
                        <option value="">Select Brand</option>
                        {brandState.map((i, j) => {
                          return (
                            <option key={j} value={i._id}>
                              {i.title}
                            </option>
                          );
                        })}
                      </select>
                      <div className="error">
                        {formik.touched.idBrand && formik.errors.idBrand}
                      </div>
                      <select
                        name="idCategory"
                        onChange={formik.handleChange("idCategory")}
                        onBlur={formik.handleBlur("idCategory")}
                        value={formik.values.idCategory}
                        className="form-control py-3 mb-3"
                        id=""
                      >
                        <option value="">Select Category</option>
                        {catState.map((i, j) => {
                          return (
                            <option key={j} value={i._id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="error">
                        {formik.touched.idCategory && formik.errors.idCategory}
                      </div>

                      <select
                        name="idContainerCategory"
                        onChange={formik.handleChange("idContainerCategory")}
                        onBlur={formik.handleBlur("idContainerCategory")}
                        value={formik.values.categorycontainer}
                        className="form-control py-3 mb-3"
                        id=""
                      >
                        <option value="">Select categorycontainer</option>
                        {categorycontainer.map((i, j) => {
                          return (
                            <option key={j} value={i._id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="error">
                        {formik.touched.idContainerCategory &&
                          formik.errors.idContainerCategory}
                      </div>
                      <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="quantity"
                        onChng={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                      />
                      <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                      </div>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal>
                      <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            dispatch(uploadImg(acceptedFiles))
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                      <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                          return (
                            <div className=" position-relative" key={j}>
                              <button
                                type="button"
                                onClick={() => dispatch(delImg(i.public_id))}
                                className="btn-close position-absolute"
                                style={{ top: "10px", right: "10px" }}
                              ></button>
                              <img
                                src={i.url}
                                alt=""
                                width={200}
                                height={200}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <input type="file" id="fileInput" multiple />
                      <button
                        type="submit"
                        className="btn btn-success bg-success border-0 rounded-3 my-5"
                        onClick={() => {
                          console.log(formik.values);
                        }}
                      >
                        Add Product
                      </button>
                    </form>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <h3 className="mb-4 title">Danh Mục Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
