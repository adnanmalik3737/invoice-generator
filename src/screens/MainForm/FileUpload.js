import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FileUpload.css";

function ImageUploader(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });

  // Old function for updating image
  // const handleLogoChange = (e) => {
  //   if (e.target.files.length) {
  //     setImage({
  //       preview: URL.createObjectURL(e.target.files[0]),
  //       raw: e.target.files[0],
  //     });

  //     // Pass the image raw data to a callback prop, if provided
  //     if (props.onImageChange) {
  //       props.onImageChange(e.target.files[0]);
  //     }
  //   }
  // };

  // New function for updating image
  const handleLogoChange = (e) => {
    if (e.target.files.length) {
      const imageData = {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      };
      setImage(imageData);

      // Pass the image raw data to a callback prop, if provided
      if (props.onImageChange) {
        props.onImageChange(imageData);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch(props.uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <div className="logo">
      {/* <label htmlFor={props.inputId} "upload-logo" className="Logoupload"> */}
      <label htmlFor={props.inputId} className="Logoupload">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M16.3844 12.201C16.1998 12.3856 15.9494 12.4893 15.6883 12.4893C15.4273 12.4893 15.1769 12.3856 14.9923 12.201L13.241 10.4493V16.5618C13.241 16.8229 13.1373 17.0733 12.9527 17.2579C12.7681 17.4425 12.5177 17.5462 12.2566 17.5462C11.9956 17.5462 11.7452 17.4425 11.5606 17.2579C11.376 17.0733 11.2723 16.8229 11.2723 16.5618V10.4493L9.52054 12.201C9.42918 12.2927 9.32064 12.3654 9.20114 12.4151C9.08164 12.4648 8.95352 12.4904 8.82411 12.4905C8.69469 12.4906 8.56653 12.4652 8.44695 12.4157C8.32736 12.3663 8.21871 12.2937 8.1272 12.2022C8.03569 12.1107 7.96312 12.002 7.91365 11.8824C7.86417 11.7629 7.83876 11.6347 7.83887 11.5053C7.83897 11.3759 7.8646 11.2477 7.91427 11.1282C7.96394 11.0087 8.03669 10.9002 8.12835 10.8089L11.5605 7.37666C11.7452 7.19208 11.9956 7.08838 12.2566 7.08838C12.5177 7.08838 12.7681 7.19208 12.9527 7.37666L16.3844 10.8089C16.569 10.9935 16.6727 11.2439 16.6727 11.5049C16.6727 11.766 16.569 12.0164 16.3844 12.201Z"
                fill="#009BD6"
              />
              <path
                d="M20.9959 19.1017C20.9178 19.2049 20.8201 19.2916 20.7084 19.357C20.5967 19.4223 20.4732 19.465 20.345 19.4826C20.2167 19.5002 20.0863 19.4923 19.9611 19.4594C19.836 19.4265 19.7185 19.3693 19.6155 19.2909C19.5125 19.2126 19.4259 19.1147 19.3608 19.0029C19.2956 18.8911 19.2532 18.7675 19.2358 18.6392C19.2185 18.511 19.2266 18.3806 19.2598 18.2554C19.2929 18.1303 19.3504 18.013 19.4289 17.9101C20.7423 16.1771 21.3839 14.0273 21.2354 11.8579C21.0868 9.68852 20.1581 7.64623 18.6208 6.1084C15.1122 2.59887 9.40235 2.5984 5.89282 6.10699C4.35532 7.64452 3.42626 9.68656 3.27728 11.8558C3.1283 14.0251 3.76948 16.175 5.08235 17.9082C5.16088 18.0111 5.21836 18.1285 5.2515 18.2536C5.28463 18.3787 5.29276 18.5091 5.27543 18.6374C5.2581 18.7656 5.21565 18.8892 5.1505 19.001C5.08536 19.1128 4.9988 19.2107 4.89578 19.2891C4.79275 19.3674 4.67529 19.4247 4.55012 19.4575C4.42495 19.4904 4.29452 19.4983 4.16629 19.4807C4.03807 19.4632 3.91457 19.4205 3.80287 19.3551C3.69117 19.2897 3.59345 19.203 3.51532 19.0998C2.28167 17.4726 1.5267 15.5334 1.33537 13.5004C1.14405 11.4674 1.52397 9.42135 2.43237 7.59257C3.34077 5.76378 4.74159 4.22485 6.47715 3.14899C8.21272 2.07313 10.2141 1.50305 12.2561 1.50293H12.2575C14.2996 1.50328 16.301 2.07362 18.0365 3.14976C19.772 4.2259 21.1727 5.7651 22.0809 7.59411C22.989 9.42312 23.3687 11.4693 23.177 13.5024C22.9853 15.5354 22.2299 17.4746 20.9959 19.1017Z"
                fill="#009BD6"
              />
              <path
                d="M23.1787 22.3506C23.1787 22.6116 23.0749 22.862 22.8903 23.0466C22.7057 23.2312 22.4554 23.3349 22.1943 23.335H2.31934C2.05826 23.335 1.80788 23.2313 1.62328 23.0466C1.43867 22.862 1.33496 22.6117 1.33496 22.3506C1.33496 22.0895 1.43867 21.8391 1.62328 21.6545C1.80788 21.4699 2.05826 21.3662 2.31934 21.3662H22.1943C22.4554 21.3663 22.7057 21.47 22.8903 21.6546C23.0749 21.8392 23.1787 22.0895 23.1787 22.3506Z"
                fill="#009BD6"
              />
            </svg>
            <p className="uploadText">Upload</p>
          </>
        )}
      </label>
      <input
        type="file"
        // id="upload-logo"
        id={props.inputId}
        style={{ display: "none" }}
        onChange={handleLogoChange}
      />
    </div>
  );
}

ImageUploader.propTypes = {
  inputId: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
  onImageChange: PropTypes.func,
};

export default ImageUploader;
