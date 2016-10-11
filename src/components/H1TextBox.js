import React, {Component} from 'react';
import { FormControl } from 'react-bootstrap';
import '../styles/H1TextBox.scss';

class h1TextBox extends Component {
    
    render() {
      const { placeholder, value, handleChange } = this.props;
      
      return (
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

    }
   }

export default h1TextBox;