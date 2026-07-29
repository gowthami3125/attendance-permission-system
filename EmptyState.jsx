import React from 'react';

const EmptyState = ({ message = 'No data available' }) => {
  return <div className="empty-state">{message}</div>;
};

export default EmptyState;
