import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import ImageUploader from "./FileUpload";
import SignaturePad from "react-signature-canvas";

function SignaturePopup({ imageURL, setImageURL }) {
  // const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  //   const save = () =>
  //     setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  const save = (close) => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    close(); // Close the popup
  };
  return (
    <div className="">
      <Popup
        modal
        className="signPopup"
        open={true}
        // trigger={
        //   true
        //   // <button
        //   //   type="button"
        //   //   className="addSignBtn"
        //   //   // onClick={() => toggleBodyDarkened(true)}
        //   // >
        //   //   <svg
        //   //     xmlns="http://www.w3.org/2000/svg"
        //   //     width="16"
        //   //     height="15"
        //   //     viewBox="0 0 16 15"
        //   //     fill="none"
        //   //   >
        //   //     <path
        //   //       d="M7.80176 1.65625V7.65625M7.80176 7.65625V13.6562M7.80176 7.65625H13.8018M7.80176 7.65625H1.80176"
        //   //       stroke="white"
        //   //       strokeWidth="2.5"
        //   //       strokeLinecap="round"
        //   //       strokeLinejoin="round"
        //   //     />
        //   //   </svg>
        //   // </button>
        // }
        closeOnDocumentClick={false}
        // onOpen={() => toggleBodyDarkened(true)} // Add this line
        // onClose={() => toggleBodyDarkened(false)} // Add this line
      >
        {(close) => (
          <div className="signatureInput">
            <button onClick={close} className="signCloseBtn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="white"
              >
                <path
                  d="M1.51855 9.55225L9.51855 1.55225M1.51855 1.55225L9.51855 9.55225"
                  stroke="#111"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />

            <div className="signatureBtns">
              <button className="signatureBtn clearBtn" onClick={clear}>
                Clear
              </button>
              <button
                className="signatureBtn saveBtn"
                onClick={() => save(close)}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Popup>
      <br />
      <br />

      {imageURL ? (
        <img className="signatureImage" src={imageURL} alt="signature" />
      ) : null}
    </div>
  );
}

export default SignaturePopup;
