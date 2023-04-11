import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddFooter = () => {
  const [slogan, setSlogan] = useState("");
  const [address, setAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const [iframeggmap, setIframeggmap] = useState("");
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/info/")
        .then((response) => {
          console.log(response.data);
          setFooter(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  return (
    <div className="max-w-full lg:w-[100%]">
      {footer.map((footer) => (
        <>
          <h3 className="mb-4 text-xl font-bold">
            {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý
            Chân Trang
          </h3>
          <div>
            <form
              encType="multipart/form-data"
              className="d-flex gap-3 flex-column"
              //   onSubmit={submitform}
            >
              <div>
                {" "}
                <label
                  className="block font-medium text-blue-500 mb-2 mt-2"
                  for="file_input"
                >
                  Khẩu hiệu dưới logo
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={footer.slogan}
                  onChange={(e) => {
                    setSlogan(e.target.value);
                  }}
                />
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Thay đổi địa chỉ
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 mt-2 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={footer.address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Thay đổi số điện thoại
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900  mt-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={footer.hotline}
                  onChange={(e) => {
                    setHotline(e.target.value);
                  }}
                />
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Thay đổi ifame google map
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={footer.iframeggmap}
                  onChange={(e) => {
                    setIframeggmap(e.target.value);
                  }}
                />
              </div>

              <button
                className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] mt-2 rounded-3 my-5 w-[210px] h-[40px] "
                type="submit"
              >
                Chỉnh sửa chân trang
              </button>
            </form>
          </div>
        </>
      ))}
    </div>
  );
};

export default AddFooter;
