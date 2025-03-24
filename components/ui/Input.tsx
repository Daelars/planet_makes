import React from 'react';

type InputProps = {
  // ...existing code...
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <input {...props} />
  );
};

export default Input;
