import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as yup from "yup";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddAbout = () => {
  const [about, setAbout] = useState([]);
  const [descriptionwhoarewe, setDescriptionwhoarewe] = useState("");
  const [descriptionstartupstory1, setDescriptionstartupstory1] = useState("");
  const [descriptionstartupstory2, setDescriptionstartupstory2] = useState(""); 
  const [descriptionstartupstory3, setDescriptionstartupstory3] = useState("");
  const [chatluong, setChatluong] = useState("");
  const [chuyennghiep, setChuyennghiep] = useState("");
  const [tienphong, setTienphong] = useState("");
  const [tamnhin, setTamnhin] = useState("");
  const [sumang, setSumang] = useState("");
 
  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/about-us/")
        .then((response) => {
          console.log(response.data);
          setAbout(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  return (
    <div className="max-w-full lg:w-[100%]">
      {about.map((about) => (
        <>
          <h3 className="mb-4 text-xl font-bold">
            {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý
            Thông tin About
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
                   <img
                  src={about.imgheader.secure_url}
                  alt=""
                  width={100}
                  height={80}
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
                  placeholder={about.descriptionwhoarewe}
                  onChange={(e) => {
                    setDescriptionwhoarewe(e.target.value);
                  }}
                />
                <div>
                  <input
                    class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                    id="large_size"
                    type="file"
                    //   onChange={(e) => setImageThumbnail(e.target.files[0])}
                  />
                   <img
                  src={about.imgheader.secure_url}
                  alt=""
                  width={100}
                  height={80}
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
                   <img
                  src={about.imgheader.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                </div>
                <div>
                  <input
                    class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                    id="large_size"
                    type="file"
                    //   onChange={(e) => setImageThumbnail(e.target.files[0])}
                  />
                   <img
                  src={about.imgheader.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                </div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Nội dung 1
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.descriptionstartupstory1}
                  onChange={(e) => {
                    setDescriptionstartupstory1(e.target.value);
                  }}
                />
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Nội dung 2
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.descriptionstartupstory2}
                  onChange={(e) => {
                    setDescriptionstartupstory2(e.target.value);
                  }}
                />
                 <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Nội dung 3
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.descriptionstartupstory3}
                  onChange={(e) => {
                    setDescriptionstartupstory3(e.target.value);
                  }}
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
                   <img
                  src={about.imgslide1.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                </div>
                <div>
                  <input
                    class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                    id="large_size"
                    type="file"
                    //   onChange={(e) => setImageThumbnail(e.target.files[0])}
                  />
                   <img
                  src={about.imgslide2.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                </div>
                <div>
                  <input
                    class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                    id="large_size"
                    type="file"
                    //   onChange={(e) => setImageThumbnail(e.target.files[0])}
                  />
                   <img
                  src={about.imgslide3.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                </div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                 Text slide 1
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.chatluong}
                  onChange={(e) => {
                    setChatluong(e.target.value);
                  }}
                />
          
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Text slide 2
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.tamnhin}
                  onChange={(e) => {
                    setTamnhin(e.target.value);
                  }}
                />
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Text slide 3
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={about.sumang}
                  onChange={(e) => {
                    setSumang(e.target.value);
                  }}
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
        </>
      ))}
    </div>
  );
};

export default AddAbout;
