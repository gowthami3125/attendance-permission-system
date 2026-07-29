import React from 'react';

const Modal = ({ children, isOpen = false, title = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
