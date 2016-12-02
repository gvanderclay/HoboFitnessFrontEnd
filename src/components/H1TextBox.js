import React from 'react';
import { FormControl } from 'react-bootstrap';
import '../styles/H1TextBox.scss';

const H1TextBox = ({ style,  placeholder, value, handleChange }) => (
  <div>
    <FormControl 
        autoFocus
        type='text'
        placeholder={placeholder} 
        defaultValue={value}
        onChange={handleChange}
        style={style}
    />
  </div>
);

export default H1TextBox;
