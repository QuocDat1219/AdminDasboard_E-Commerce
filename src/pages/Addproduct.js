import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Button, Card, Col, Row, Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import { getCategoryContainer } from "../features/categorycontainer/categorycontainerSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import MultiUpload from "./../components/MultiUpload";
import axios from "axios";
import { Editor } from "draft-js";
import { EditorState, convertToRaw } from "draft-js";
import { config } from "../utils/axiosconfig";
import ImageUploading from "react-images-uploading";
import ClipLoader from "react-spinners/ClipLoader";
import "./Addproduct.css";
import { ToastContainer, toast } from "react-toastify";
import { Alert, Space, Spin } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  idBrand: yup.string().required("Brand is Required"),
  idCategory: yup.string().required("Category is Required"),
  idContainerCategory: yup.string().required("ContainerCategory is Required"),
});
const maxNumber = 69;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Addproduct = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);

  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const brandState = useSelector((state) => state.brands.menus);
  useEffect(() => {
    if (brandState?.length <= 0) {
      dispatch(getMenus());
    }
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getCategoryContainer());
  }, [brandState?.length]);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const productStates = useSelector((state) => state.product.products);

  const categorycontainer = useSelector(
    (state) => state.categorycontainer.categorycontainer
  );

  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  // const [product, setProduct] = useState([""]);
  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      dispatch(getAProduct(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  // const [image, setImage] = useState([]);

  const handleFormSubmit = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // construct form data
    const formData = new FormData(e.currentTarget);
    const files = e.currentTarget.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    return console.log(formData);
  };
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [Idcategory, setIdcategory] = useState(product?.idCategory);
  const [brand, setBrand] = useState(product?.idBrand);
  const [image, setImage] = useState(product?.imagesDetail);
  const [loadings, setLoadings] = useState(false);
  const { Meta } = Card;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const submitform = (e) => {
    e.preventDefault();
    // return console.log(
    //   name,  
    //   price,
    //   description,
    //   Idcategory,
    //   brand,
    //   image,
    //   images
    // );

    setLoadings(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("idCategory", Idcategory);
    formData.append("idBrand", brand);
    for (let i = 0; i < images.length; i++) {
      formData.append(`image`, images[i].file);
    }
    axios
      .put(`https://ecom-oto.vercel.app/api/products/${id}`, formData, config)
      .then((response) => {
        console.log(response);
        setLoadings(false);
        toast("Thêm thành công");
      })
      .catch((error) => {
        console.log(error);
        toast("Thêm không thành công");
        setLoadings(false);
      });
  };

  return (
    <div className="max-w-full lg:w-[100%]">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <h3 className="mb-4 text-xl font-bold">Quản Lý Sản Phẩm</h3>
        {loadings == false ? (
          <>
            <div>
              <form
                encType="multipart/form-data"
                className="d-flex gap-3 flex-column"
                onSubmit={submitform}
              >
                <input
                  type="text"
                  name="name"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder="Nhập tiêu tên sản phẩm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <input
                  type="number"
                  name="price"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder="Nhập giá"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <div className="">
                  <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={setDescription}
                    value={description}
                  />
                </div>
                <select
                  name="category"
                  className="form-control py-2 mb-3 "
                  onChange={(e) => setIdcategory(e.target.value)}
                  value={Idcategory}
                  required
                >
                  <option>Chọn danh mục sản phẩm</option>
                  {catState.map((i, j) => {
                    return (
                      <option key={j} value={i._id}>
                        {i.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="brand"
                  className="form-control py-2 mb-3 "
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                  required
                >
                  <option>Chọn danh mục thương hiệu</option>
                  {brandState.map((i, j) => {
                    return (
                      <option key={j} value={i._id}>
                        {i.title}
                      </option>
                    );
                  })}
                </select>

                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="upload__image-wrapper  ">
                      <button
                        className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
                        style={isDragging ? { color: "red" } : null}
                        onClick={(e) => {
                          e.preventDefault();
                          onImageUpload();
                        }}
                        {...dragProps}
                      >
                        Chọn ảnh
                      </button>
                      &nbsp;
                      <button
                        className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
                        onClick={(e) => {
                          e.preventDefault();
                          onImageRemoveAll();
                        }}
                      >
                        Xóa tất cả ảnh
                      </button>
                      <Row gutter={[16, 16]}>
                        {image?.map((image, index) => (
                          <Col>
                            {" "}
                            <Card
                              className=""
                              style={{
                                width: 200,
                              }}
                              cover={
                                <img
                                  alt="example"
                                  className="w-[100px] h-[250px] object-cover"
                                  src={image.original}
                                />
                              }
                              actions={[
                                <DeleteOutlined
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onImageRemove(index);
                                  }}
                                  key="delete"
                                />,
                                <EditOutlined
                                  key="edit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onImageUpdate(index);
                                  }}
                                />,
                              ]}
                            ></Card>{" "}
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </ImageUploading>
                <button
                  className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 text-center my-5 w-[210px] h-[40px] "
                  type="submit"
                >
                  {id !== undefined ? <>Sửa</> : <>Thêm</>}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <Spin tip="Loading...">
              <div>
                <form
                  encType="multipart/form-data"
                  className="d-flex gap-3 flex-column"
                  onSubmit={submitform}
                >
                  <input
                    type="text"
                    name="name"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                    placeholder="Nhập tiêu tên sản phẩm"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                    placeholder="Nhập giá"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Nhập mô tả"
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    cols="33"
                  ></textarea>
                  <select
                    name="category"
                    className="form-control py-2 mb-3 "
                    onChange={(e) => setIdcategory(e.target.value)}
                    required
                  >
                    <option>Chọn danh mục sản phẩm</option>
                    {catState.map((i, j) => {
                      return (
                        <option key={j} value={i._id}>
                          {i.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="brand"
                    className="form-control py-2 mb-3 "
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option>Chọn danh mục thương hiệu</option>
                    {brandState.map((i, j) => {
                      return (
                        <option key={j} value={i._id}>
                          {i.title}
                        </option>
                      );
                    })}
                  </select>

                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div className="upload__image-wrapper  ">
                        <button
                          className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
                          style={isDragging ? { color: "red" } : null}
                          onClick={(e) => {
                            e.preventDefault();
                            onImageUpload();
                          }}
                          {...dragProps}
                        >
                          Chọn ảnh
                        </button>
                        &nbsp;
                        <button
                          className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
                          onClick={(e) => {
                            e.preventDefault();
                            onImageRemoveAll();
                          }}
                        >
                          Xóa tất cả ảnh
                        </button>
                        <div className="grid grid-cols-5 gap-0">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <div className="image-item__btn-wrapper flex flex-col items-center justify-center ">
                                <div>
                                  <img
                                    src={image.data_url}
                                    alt=""
                                    width="100"
                                  />
                                </div>
                                <div>
                                  <button
                                    className="bg-blue-500 text-white lg:h-[40px] lg:w-[50px] m-1 rounded-3 my-2 w-[100px] h-[40px] "
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onImageUpdate(index);
                                    }}
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    className="bg-blue-500 text-white lg:h-[40px] lg:w-[50px] m-1 rounded-3 my-2 w-[100px] h-[40px] "
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onImageRemove(index);
                                    }}
                                  >
                                    Xóa
                                  </button>
                                </div>
                                <hr />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                  <button
                    className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 text-center my-5 w-[210px] h-[40px] "
                    type="submit"
                  >
                    {/* <ClipLoader color="#36d7b7" /> */}
                    Thêm
                  </button>
                </form>
              </div>
            </Spin>
          </>
        )}
      </Space>
    </div>
  );
};

export default Addproduct;
