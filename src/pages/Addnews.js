import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  getCategories,
  createNewblogCat,
  getABlogCat,
  updateABlogCat,
  deleteABlogCat,
} from "../features/bcategory/bcategorySlice";
import {
  createMenu,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

import axios from "axios";
import { config } from "../utils/axiospostformdata";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const Addnews = () => {
  const [titles, setTitles] = useState("");
  const [category, setCategory] = useState("");
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [videos, setVideos] = useState("");
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorState) => {
    setEditorContent(editorState);
  };

  const submitform = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", titles);
    formData.append("category", category);
    formData.append("image", imageThumbnail);
    formData.append("video", videos);
    formData.append(
      "description",
      JSON.stringify(convertToRaw(editorContent.getCurrentContent()))
    );

    axios
      .post("https://ecom-oto.vercel.app/api/blog/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        alert("Thêm thành công")
      }).catch((error) => {
        if (error.response.status === 500) {
          alert("Tiêu đề đã tồn tại hoặc chưa chọn danh mục tin tức")
        } else {
          console.error(error);
        }
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const blogcategoryState = useSelector((state) => state.bCategory.bCategories);
  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4 text-xl font-bold">
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Tin
        Tức
      </h3>
      <div>
        <form
          encType="multipart/form-data"
          className="d-flex gap-3 flex-column"
          onSubmit={submitform}
        >
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
            placeholder="Nhập tiêu đề tin tức"
            onChange={(e) => setTitles(e.target.value)}
            required
          />
          <select
            name="brand"
            className="form-control py-2 mb-3 "
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option >
              Chọn danh mục tin tức
            </option>
            {blogcategoryState.map((i, j) => {
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
              Chọn ảnh bìa
            </label>
            <input
              class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
              id="large_size"
              type="file"
              onChange={(e) => setImageThumbnail(e.target.files[0])}
            />
          </div>
          <div>
            <input
              type="text"
              id="youtube-id"
              className="bg-gray-50 border  border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              name="youtube-id"
              placeholder="Nhập id video"
              onChange={(e) => setVideos(e.target.value)}
            />
          </div>
          <div
            className="Mn_wysiwyg"
            style={{
              marginTop: "30px",
              width: "98%",
              backgroundColor: "white",
            }}
          >
            <Editor
              label="Nhập Tin Tức"
              className="text-sm"
              editorState={editorContent}
              onEditorStateChange={handleEditorChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            Thêm Tin Tức
          </button>
        </form>
        <div>
          <h2>Preview:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                convertToRaw(editorContent.getCurrentContent())
              ),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Addnews;
