import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as yup from "yup";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddAbout = () => {
  //   const [titles, setTitles] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [imageThumbnail, setImageThumbnail] = useState("");
  //   const [videos, setVideos] = useState("");
  //   const [setDescription, setStateDescription] = useState();

  //   console.log(setDescription);
  // const handleEditorChange = (editorState) => {
  //   setEditorContent(editorState);
  // };

  // useEffect(() => {
  //   const des = JSON.stringify(editorContent);
  //   console.log(des);
  //   const det = JSON.parse(des);
  //   console.log(det);
  // }, [editorContent]);

  //   const submitform = (e) => {
  //     e.preventDefault();
  //     let formData = new FormData();
  //     formData.append("title", titles);
  //     formData.append("category", category);
  //     formData.append("image", imageThumbnail);
  //     formData.append("video", videos);
  //     formData.append("description", setDescription);

  //     axios
  //       .post("https://ecom-oto.vercel.app/api/blog/", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((Response) => {
  //         console.log(Response);
  //       });
  //   };

  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getCategories());
  //   }, []);

  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4 text-xl font-bold">
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Thông
        tin About
      </h3>
      <div>
        <form
          encType="multipart/form-data"
          className="d-flex gap-3 flex-column"
          //   onSubmit={submitform}
        >
          <div>
            <label
              className="block mb-2 font-medium text-blue-500 "
              for="file_input"
            >
              Chỉnh sửa header
            </label>
            <div>
              <input
                class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              className="block mb-2 font-medium text-blue-500 "
              for="file_input"
            >
              Chỉnh sửa chúng ta là ai
            </label>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 borde r border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập miêu tả"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <div>
              <input
                class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              className="block mb-2 font-medium text-blue-500 "
              for="file_input"
            >
              Chỉnh sửa khởi nghiệp
            </label>
            <div>
              <input
                class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <div>
              <input
                class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập miêu tả 1"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập miêu tả 2"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập miêu tả 3"
              // onChange={(e) => setTitles(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label
              className="block mb-2 font-medium text-blue-500 "
              for="file_input"
            >
              Chỉnh sửa ảnh slider
            </label>
            <div>
              <input
                class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <div>
              <input
                class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <div>
              <input
                class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập thông tin chất lượng"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập thông tin chuyên nghiệp "
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập thông tin tiên phong"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập thông tin tầm nhìn"
              // onChange={(e) => setTitles(e.target.value)}
            />
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập thông tin sứ mệnh"
              // onChange={(e) => setTitles(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            Chỉnh sửa Trang Chủ
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAbout;
