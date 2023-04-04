import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteAProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
// import { getAProductCategory } from "../features/pcategory/pcategorySlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getCategoryContainer } from "../features/categorycontainer/categorycontainerSlice";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
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
const { Option } = Select;

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
    title: "ContainerCategory",
    dataIndex: "ContainerCategory",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Ảnh sản phẩm",
    dataIndex: "url",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Productlist = () => {
  const productState = useSelector((state) => state.product.products);
  const pCategory = useSelector((state) => state.pCategory.pCategories);
  const categorycontainer = useSelector(
    (state) => state.categorycontainer.categorycontainer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getCategoryContainer());
  }, []);
  console.log(productState, pCategory);
  const data1 = [];
  const [popdtProduct, setProduct] = useState([]);
  const [popdtCategory, setdtCategory] = useState([]);
  const popProduct = (data) => {
    setProduct(data);
  };
  const popCategory = (data) => {
    setdtCategory(data);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteAProduct(id));
    await dispatch(getProducts());
    await dispatch(getCategories());
  };
  productState?.map((productState, i) => {
    pCategory?.map((pCate) => {
      if (productState?.idCategory === pCate?._id) {
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
                  // deleteProduct(12);
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
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);

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
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
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
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex justify-center flex-col ">
                  <div className="mt-2  sm:ml-4 sm:text-left">
                    <Form
                      name="validate_other"
                      {...formItemLayout}
                      onFinish={onFinish}
                      initialValues={{
                        "input-number": 3,
                        "checkbox-group": ["A", "B"],
                        rate: 3.5,
                      }}
                      style={{
                        maxWidth: 600,
                      }}
                    >
                      <Form.Item label="Mã sản phẩm">
                        <span className="ant-form-text">
                          {popdtProduct?._id}
                        </span>
                      </Form.Item>
                      <Form.Item
                        name="select"
                        label="Loại hàng hóa"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Chọn loại hàng hóa",
                          },
                        ]}
                      >
                        {" "}
                        {console.log("popdtCategory" + popdtCategory)}
                        <Select
                          defaultValue={
                            popdtCategory.name == null
                              ? "null"
                              : popdtCategory.name
                          }
                          placeholder="Chọn danh mục hàng hóa"
                        >
                          {pCategory.map((cate) => (
                            <>
                              <Option value={cate.name}>{cate.name}</Option>
                            </>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Tên sản phẩm">
                        <Input defaultValue={popdtProduct?.name} />
                      </Form.Item>
                      <Form.Item label="Giá">
                        <InputNumber value={popdtProduct?.price} />
                      </Form.Item>
                      <Form.Item label="Mô tả">
                        <Input value={popdtProduct?.description} />
                      </Form.Item>
                      <Form.Item label="Số lượng">
                        <Input value={popdtProduct?.quantity} />
                      </Form.Item>
                      <Form.Item label="Số lượng đã bán">
                        <InputNumber value={popdtProduct?.sold} />
                      </Form.Item>

                      <Form.Item
                        name="switch"
                        label="Trạng thái"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.Item>
                        <Button className="bg-slate-400" onClick={normFile}>
                          Add Image
                        </Button>
                      </Form.Item>
                      <div className="items-center gap-2 mt-3 sm:flex">
                        <button
                          className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                          onClick={() => {
                            setshowModalEdit(false);
                          }}
                        >
                          Xác nhận
                        </button>
                        <button
                          type="submit"
                          className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => setshowModalEdit(false)}
                        >
                          Hủy
                        </button>
                      </div>
                    </Form>
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
