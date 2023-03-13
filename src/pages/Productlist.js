import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Id",
    dataIndex: "id",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Description",
    dataIndex: "description", 
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Category",
    dataIndex: "idCategory",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Sold",
    dataIndex: "sold",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Image Thumbnail",
    dataIndex: "url",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  console.log(productState);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      id: productState[i]._id,
      name: productState[i].name,
      price: productState[i].price,
      description: productState[i].description,
      quantity: productState[i].quantity,
      idCategory: productState[i].idCategory,
      slug: productState[i].slug,
      sold: productState[i].sold,
      url: productState[i].imagesDetail[0].url,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
