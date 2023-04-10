import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomModal from "../components/CustomModal";
import {
  getBlogNews,
  deleteBlog,
  resetState,
} from "../features/blogNews/blogSlice";
import Modal from "antd/es/modal/Modal";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import imgerror from "../image/imgerror.png";
const Listnews = () => {
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [editingBlog, setEditingBlog] = useState(null);

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
      render: (url) =>
        url == undefined ? (
          <img src={imgerror} alt="" width={100} height={100} />
        ) : (
          <img src={url.secure_url} alt="" width={100} height={100} />
        ),
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
  // const [description, setDescription] = useState({});

  const [pNewID, setpNewID] = useState("");
  const [open, setOpen] = useState(false);

  const showModelNews = (e) => {
    setOpen(true);
    setpNewID(e);
  };
  const showModalEdit = (blog) => {
    setEditingBlog(blog);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (desc) => {
    console.log(desc);
    const des = JSON.parse(desc);
    setEditorContent(
      EditorState.createWithContent(convertFromRaw(JSON.parse(desc)))
    );
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
            <button
              className="fs-3 text-primary bg-transparent border-0"
              onClick={() => showModalEdit(blogState[i])}
            >
              <BiEdit />
            </button>
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
    toast.success("Xóa thành công");

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  console.log(data);
  return (
    <>
      <div>
        <ToastContainer pauseOnHover={false} draggable={false} />
        <h3 className="mb-4 text-xl font-bold">Danh Mục Tin Tức</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>

        <Modal
          title="Edit Blog"
          visible={open}
          onCancel={hideModal}
          footer={[
            <Button key="cancel" onClick={hideModal}>
              Cancel
            </Button>,
            <Button key="save">Save</Button>,
          ]}
        >
          {editingBlog && (
            <Form>
              <Form.Item label="Title">
                <Input
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea
                  value={editingBlog.description}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Form>
          )}
        </Modal>

        {/* <div className="mt-4">
          <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteCategory(pNewID);
            }}
            title="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
          />
        </div> */}
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Description"
          footer={null}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                convertToRaw(editorContent.getCurrentContent())
              ),
            }}
          ></div>

          {/* {editorContent} */}
        </Modal>
      </div>
    </>
  );
};

export default Listnews;
