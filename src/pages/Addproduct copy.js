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
import axios from "axios";
import { Editor } from "draft-js";
import { EditorState, convertToRaw } from "draft-js";
import { config } from "../utils/axiosconfig";
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
  // const [image, setImage] = useState([]);
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
      secure_url: i.url,
    });
  });

  useEffect(() => {
    formik.values.image = imageThumbnail;
    // formik.values.imagesDetail = fileList;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      idCategory: "",
      image: "",
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
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const handleEditorChange = (editorState) => {
    setEditorContent(editorState);
  };
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
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Idcategory, setIdcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [imagesDetail, setImagesDetail] = useState([]);
  const [imagesDefault1, setImagesDefault1] = useState({});

  // const dta =
  const uploadFiles = (files) => {
    const CLOUD_NAME = "diqrp01gb";
    const PRESET_NAME = "thanhdat";
    const FOLDER_NAME = "thanhdat";

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    let formData = new FormData();

    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);
      axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          const imagesDefaults = {
            public_id: response.data.public_id,
            secure_url: response.data.secure_url,
          };
          console.log(imagesDefaults);
          await setImagesDefault1([...imagesDefault1, imagesDefaults]);

          const imagesDetails = {
            public_id: response.data.public_id,
            original: response.data.secure_url,
            thumbnail: response.data.secure_url,
          };

          await setImagesDetail([...imagesDetail, imagesDetails]);
        })
        .catch((error) => console.log(error));
    }

    axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const imagesDetails = {
          public_id: response.data.public_id,
          original: response.data.secure_url,
          thumbnail: response.data.secure_url,
        };
        await setImagesDetail([...imagesDetail, imagesDetails]);
      })
      .catch((error) => console.log(error));

    axios
      .post(
        "https://ecom-oto.vercel.app/api/products/",
        {
          name: name,
          price: price,
          description: description,
          idCategory: Idcategory,
          idBrand: brand,
          imagesDetail: imagesDetail,
        },
        config
      )
      .then((Response) => {
        alert("Thêm thành công");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 500) {
          alert("Thêm không thành công");
        } else {
          console.error(error);
        }
      });
  };
  const submitform = (e) => {
    e.preventDefault();
    uploadFiles(image);
  };

  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4 text-xl font-bold">
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */}
        Quản Lý Sản Phẩm
      </h3>
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

          <div>
            <label
              className="block mb-2 font-medium text-black "
              for="file_input"
            >
              Chọn ảnh sản phẩm
            </label>
            <input
              class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
              id="large_size"
              type="file"
              multiple
              onChange={(e) => setImage(e.target.files)}
            />
          </div>
          <hr className="mt-10 mb-10" />
          <div>
            <label
              className="block mb-2 font-medium text-black "
              for="file_input"
            >
              Chọn ảnh sản phẩm
            </label>
            <input
              class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
              id="large_size"
              type="file"
              // onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
