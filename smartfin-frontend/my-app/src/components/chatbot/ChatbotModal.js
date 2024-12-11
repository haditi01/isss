// ChatbotModal.js
import React, { useEffect } from 'react';
import './ChatbotModal.css';

const ChatbotModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const chatbotWindow = window.open(
        'https://mediafiles.botpress.cloud/4c5053dc-5443-4d62-b6ce-8605d17709e8/webchat/bot.html',
        'Chatbot',
        'width=400,height=600'
      );
      const timer = setInterval(() => {
        if (chatbotWindow.closed) {
          onClose();
          clearInterval(timer);
        }
      }, 1000);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      
    </div>
  );
};

export default ChatbotModal;
