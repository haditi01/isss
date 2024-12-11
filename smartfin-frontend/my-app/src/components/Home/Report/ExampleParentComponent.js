// ExampleParentComponent.js
import React, { useState } from 'react';
import ReportModal from './ReportModal';

const ExampleParentComponent = () => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  const handleCloseModal = () => {
    setReportModalOpen(false);
  };

  const handleOpenModal = () => {
    setReportModalOpen(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Report Modal</button>
      {isReportModalOpen && <ReportModal onClose={handleCloseModal} />}
    </div>
  );
};

export default ExampleParentComponent;
