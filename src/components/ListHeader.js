import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions'
import '../styles/ListHeader.scss';

const ListHeader = ({ type, dispatch, addObject }) => {
  return (
    <div className='list-header'>
      <h1>{type}</h1>
      <Button 
        bsSize='large' 
        onClick={() => {
          dispatch(actions[addObject]('New Routine'));
        } 
          
      }>
        + New {type}
      </Button>
    </div>  
  )
}

ListHeader.propTypes = { 
  type: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(ListHeader);