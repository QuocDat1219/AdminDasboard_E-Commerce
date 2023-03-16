import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw, convertToHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from "dompurify";
import {
  deleteABrand,
  getMenus,
  resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import CustomModalMenu from "../components/CustomModalMenu";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên Menu",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Nội dung",
    dataIndex: "doc",

    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Menulist = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal1 = (e) => {
    setOpen1(true);
    setbrandId(e);
  };
  const hideModal1 = () => {
    setOpen1(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getMenus());
  }, []);
  const brandState = useSelector((state) => state.menu.menus);
  console.log(brandState);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    const noidung = brandState[i].doc;
    // const contentState = convertFromRaw(noidung);
    // const editorState = EditorState.createWithContent(contentState);
    // const html = convertToHTML(editorState.getCurrentContent());
    console.log(noidung)
    data1.push({
      key: i + 1,
      name: brandState[i].name,
      // doc: draftToHtml(convertToRaw(brandState[i].doc.getCurrentContent())),
      doc: brandState[i].doc.blocks.text,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className=" fs-3 text-danger"
          >
          </Link>
          <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal1(brandState[i]._id)}
          >

          <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getMenus());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Menu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
      <CustomModalMenu hideModal={hideModal1} open={open1} />
    </div>
  );
};

export default Menulist;
