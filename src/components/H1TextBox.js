import React, {Component} from 'react';
import { FormControl } from 'react-bootstrap';
import '../styles/H1TextBox.scss';
import * as actions from '../actions'

class h1TextBox extends Component {
    handleChange() {
      const { type } = this.props;
      actions['update' + type]();
    }
    
    render() {
      const { placeholder, value } = this.props;
      
      return (
        <div>
          <FormControl 
            ref={node => { this.input = node}} 
            type='text' 
            placeholder={placeholder} 
            value={value} 
            onChange={this.handleChange}
          />
        </div>
      );

    }
   }

export default h1TextBox;