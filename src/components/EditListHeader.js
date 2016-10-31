import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import H1Textbox from './H1TextBox';
import '../styles/ListHeader.scss';

const EditListHeader = ({ addType, handleClick, placeHolder, value, id, handleChange }) => {
  return (
      <div className='list-header'>
        <Row>
          <Col sm={8}>
          <H1Textbox
            placeHolder={placeHolder}
            value={value}
            handleChange={handleChange}
          />
          </Col>
          <Col sm={4}>
            <Button
              bsSize='large' 
              onClick={handleClick}
            >
              + {addType}
            </Button>
          </Col>
        </Row>
      </div>
  );
};


EditListHeader.propTypes = { 
  handleClick: PropTypes.func.isRequired
};


export default EditListHeader;
