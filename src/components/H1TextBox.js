import React from 'react';
import { FormControl } from 'react-bootstrap';
import '../styles/H1TextBox.scss';

const H1TextBox = ({ placeholder, value, handleChange }) => (
  <div>
    <FormControl 
        ref={node => { this.input = node }} 
        type='text' 
        placeholder={placeholder} 
        value={value} 
        onChange={handleChange}
    />
  </div>
);

export default H1TextBox;
