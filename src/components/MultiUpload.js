import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
const myImage = new CloudinaryImage("sample", {
  cloudName: "diqrp01gb",
}).resize(fill().width(100).height(150));
const MultiUpload = () => {
  const [Image, setImage] = useState({ array: [] });
  const [loading, setLoading] = useState("");

  const handleDrop = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("tags", `codeinfuse , medium, gist`);
      formData.append("upload_preset", `thanhdat`);
      formData.append("api_key", `247368411327943`);
      formData.append("timestamp", Date.now() / 1000 / 0);
      setLoading("true");
      return axios
        .post(
          "https://res.cloudinary.com/v1_1/diqrp01gb/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            // headers: {
            //   "Access-Control-Allow-Origin": "*",
            //   "Content-Type": "application/json",
            // },
            // mode: "no-cors",
            // withCredentials: true,
            // credentials: "same-origin",
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          const imageurl = data.secure_url;
          console.log(imageurl);
        });
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };

  return (
    <div className="bg-white border-1 p-5 text-center">
      <Dropzone
        onChange={(e) => setImage(e.target.value)}
        value={Image}
        // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        onDrop={handleDrop}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <div>
        <div cldImg={myImage} />
      </div>
    </div>
  );
};

export default MultiUpload;
