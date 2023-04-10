import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { getCategoryContainer } from "../features/categorycontainer/categorycontainerSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import MultiUpload from "./../components/MultiUpload";
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
const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const brandState = useSelector((state) => state.brands.menus);
  useEffect(() => {
    if (brandState?.length <= 0) {
      dispatch(getMenus());
    }
    dispatch(getCategories());
    dispatch(getCategoryContainer());
  }, [brandState?.length]);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const categorycontainer = useSelector(
    (state) => state.categorycontainer.categorycontainer
  );
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const [image, setImage] = useState([]);
  const coloropt = [];
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  colorState.forEach((i) => {});
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.imagesDetail = image;
    // formik.values.imagesDetail = fileList;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      idCategory: "",
      idContainerCategory: "",
      idBrand: "",
      imagesDetail: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
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
    // make a POST request with Axios
    // const res = await axios.post("/api/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // console.log(res);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
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
            {formik.touched.description && formik.errors.description}
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

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
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
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleImage}
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

          <div className="form-outline mb-4">
            <input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="image"
              className="form-control"
            />
            <label className="form-label" htmlFor="form4Example2">
              Image
            </label>
          </div>
          <img className="img-fluid w-20 h-20" src={image} alt="" />
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
            onClick={() => {
              console.log(formik.values);
            }}
          >
            Add Product
          </button>
        </form>
        <MultiUpload />
        {/* <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <input type="file" name="file" multiple />
          <button type="submit" className="bg-yellow-400">
            Submit
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Addproduct;
