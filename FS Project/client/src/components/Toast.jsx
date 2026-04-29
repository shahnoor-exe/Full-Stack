import React, { useEffect } from 'react';

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type === 'error' ? 'toast-error' : ''}`}>
      <span>{message}</span>
      <button 
        onClick={onClose} 
        style={{ background: 'none', border: 'none', color: 'white', marginLeft: '10px', cursor: 'pointer', fontSize: '16px' }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
