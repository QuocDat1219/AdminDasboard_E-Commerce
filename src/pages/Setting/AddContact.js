import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddContact = () => {
  //   const [titles, setTitles] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [imageThumbnail, setImageThumbnail] = useState("");
  //   const [videos, setVideos] = useState("");s
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
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Dịch
        Vụ
      </h3>
      <div>
        <form
          encType="multipart/form-data"
          className="d-flex gap-3 flex-column"
          //   onSubmit={submitform}
        >
          <div>
            <div>
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Thông tin header
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 mt-2 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                placeholder="Nhập thông tin header"
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

            <div>
              <label
                className="block mb-2 font-medium text-blue-500 mt-5 "
                for="file_input"
              >
                Nhập thông tin thân trang
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                placeholder="Nhập thông tin"
                // onChange={(e) => setTitles(e.target.value)}
              />
            </div>
            <div>
              <input
                class="block w-[98%] text-lg mt-2 text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
            <div>
              <input
                class="block w-[98%] text-lg mt-2 text-black border border-gray-300  cursor-pointer bg-gray-50"
                id="large_size"
                type="file"
                //   onChange={(e) => setImageThumbnail(e.target.files[0])}
              />
            </div>
          </div>

          <button
            className="bg-blue-500 text-white lg:h-[40px]  lg:w-[250px] mt-2 rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            Chỉnh sửa dịch vụ
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
