import React, { PropTypes } from 'react';
import pluralize from 'pluralize';
import { Button, Row, Col } from 'react-bootstrap';
import '../styles/ListHeader.scss';

const ListHeader = ({ name, handleClick }) => {
  return (
    <div className='list-header'>
      <Row>
        <Col sm={9}>
          <h1>{capitalizeFirstWord(pluralize(name))}</h1>
        </Col>
        <Col sm={3}>
        <Button 
          bsSize='large' 
          onClick={handleClick}>
          + New {name}
        </Button>
        </Col>
      </Row>
    </div>
  )
}

function capitalizeFirstWord(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

ListHeader.propTypes = { 
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}


export default ListHeader;
