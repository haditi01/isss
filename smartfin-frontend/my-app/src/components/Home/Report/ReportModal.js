import React, { useState } from 'react';
import './ReportModal.css';
import Sidebar from '../sidebar'; // Adjust the path as per your file structure

const ReportModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    // Directly set the URL for the PDF file in the public directory
    const pdfUrl = `${process.env.PUBLIC_URL}/financial_report.pdf`;

    // Create an anchor element and click it to download the PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'financial_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after handling submit
    onClose();
  };

  return (
    <div className="modal-overlay">
      <Sidebar /> {/* Include Sidebar here */}
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Report Modal</h2>
        <p>Upload your report file:</p>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReportModal;
