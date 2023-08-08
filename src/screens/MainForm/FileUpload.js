import React, { useState } from "react";
import "./FileUpload.css";

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div className="preview">
          <img className="image" src={selectedImage} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

// import React, { useState } from "react";
// import "./FileUpload.css";

// function ImageUploader() {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isLogoVisible, setIsLogoVisible] = useState(true);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // You can use FileReader API to show a preview of the image before uploading.
//       // For simplicity, we'll directly set the uploadedImage state here.
//       setUploadedImage(URL.createObjectURL(file));
//       setIsLogoVisible(false);
//     }
//   };

//   return (
//     <div>
//       {isLogoVisible && (
//         <div className="logo">
//           <img className="SVG" alt="Svg" src="SVG.svg" />
//           <p className="text-wrapper">Upload</p>
//         </div>
//       )}

//       {!isLogoVisible && uploadedImage && (
//         <div>
//           <img src={uploadedImage} alt="Uploaded" />
//           <p>Image Uploaded!</p>
//         </div>
//       )}

//       {!uploadedImage && <input type="file" onChange={handleImageChange} />}
//     </div>
//   );
// }

// export default ImageUploader;
