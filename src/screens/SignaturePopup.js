import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function SignaturePopup({ onClose, onSave }) {
  const sigCanvasRef = useRef(null);

  const handleClear = () => {
    sigCanvasRef.current.clear();
  };

  const handleSave = () => {
    const signatureDataURL = sigCanvasRef.current.toDataURL();
    onSave(signatureDataURL);
    onClose();
  };

  return (
    <div className="signature-popup">
      <div className="signature-container">
        <SignatureCanvas ref={sigCanvasRef} />
      </div>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default SignaturePopup;