import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogNews,
  deleteBlog,
  resetState,
} from "../features/blogNews/blogSlice";
import { Link, json } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import CustomModal from "../components/CustomModal";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
const Listnews = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",

      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text, record) => (
        <Button onClick={() => showModal(text)}>Xem mô tả</Button>
      ),
      // render: (text) => text.slice(0, 20),
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Ảnh tin tức",
      dataIndex: "imageThumbnail",
      render: (url) => <img src={url} alt="" width={100} height={100} />,
    },
    {
      title: "Video tin tức",
      dataIndex: "video",
      render: (id) => (
        <iframe
          width="100"
          height="50"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState({});

  const [pNewID, setpNewID] = useState("");
  const [open, setOpen] = useState(false);

  const showModelNews = (e) => {
    setOpen(true);
    setpNewID(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (desc) => {
    console.log(desc);
    const des = JSON.parse(desc);
    setDescription(desc);
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getBlogNews());
    dispatch(resetState());
  }, []);

  const blogState = useSelector((state) => state.blognew.blogs);

  console.log(blogState);
  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      title: blogState[i].title,
      description: blogState[i].description,
      category: blogState[i].category,
      imageThumbnail: blogState[i].imageThumbnail,
      video: blogState[i].video,
      action: (
        <>
          <div className="flex">
            <Link
              to={`/admin/list-news/${blogState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModelNews(blogState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogNews());
    }, 100);
  };

  console.log(data);
  return (
    <>
      <div>
        <h3 className="mb-4 text-xl font-bold">Danh Mục Tin Tức</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <div className="mt-4">
          <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteCategory(pNewID);
            }}
            title="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
          />
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Description"
          footer={null}
        >
         
          {/* <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(convertToRaw(JSON.parse(description).getCurrentContent())),
            }}
          ></div>
         */}
         {description}
        </Modal>
      </div>
    </>
  );
};

export default Listnews;
