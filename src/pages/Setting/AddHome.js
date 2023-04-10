import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddHome = () => {
  const [titleheaders, setTitleHeader] = useState("");
  const [titleproduct1s, setTitleProduct1] = useState("");
  const [titleproduct2s, setTitleProduct2] = useState("");
  const [titleservices, setTitleService] = useState("");
  const [descriptionservices, setDescriptionService] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/home/")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  return (
    <div className="max-w-full lg:w-[100%]">
      {products.map((product, index) => (
        <>
          <h3 className="mb-4 text-xl font-bold">
            {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý
            Trang Chủ
          </h3>
          <div>
            <form
              encType="multipart/form-data"
              className="d-flex gap-3 flex-column"
            >
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Chỉnh sửa header
                </label>
                <input
                  type="text"
                  id="default-input"
                  key={index}
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={product.titleheader}
                  onChange={(e) => {
                    setTitleHeader(e.target.value);
                  }}
                />
                <div>
                  <input
                    class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                    id="large_size"
                    type="file"
                  />
                </div>
                <img
                  src={product.imgheader.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
              </div>
              <div className="mt-5">
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Chỉnh sửa tiêu đề
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={product.titleprodcut1}
                  onChange={(e) => {
                    setTitleProduct1(e.target.value);
                  }}
                />
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mt-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={product.titleprodcut2}
                  onChange={(e) => {
                    setTitleProduct2(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Chỉnh sửa dịch vụ
                </label>
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={product.titleservice}
                  onChange={(e) => {
                    setTitleService(e.target.value);
                  }}
                />
                <div>
                  <input
                    class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                    id="large_size"
                    type="file"
                  />
                </div>
                <img
                  src={product.imgservice.secure_url}
                  alt=""
                  width={100}
                  height={80}
                />
                <input
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  placeholder={product.descriptionservice}
                  onChange={(e) => setDescriptionService(e.target.value)}
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

export default AddHome;
