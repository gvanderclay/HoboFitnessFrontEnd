import React, { PropTypes } from 'react';
import pluralize from 'pluralize';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getActiveRoutine } from '../reducers';
import * as actions from '../actions'
import '../styles/ListHeader.scss';

const ListHeader = ({ type, dispatch, addObject, active, router }) => {
  return (
    <div className='list-header'>
      <h1>{pluralize(type)}</h1>
      <Button 
        bsSize='large' 
        onClick={() => {
          dispatch(actions[addObject]('New Routine')).then((result) => {
            router.push('/routines/' + result.id); 
          });
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

const mapStateToProps = (state) => {
  return {
    active: getActiveRoutine(state), 
  }
}

export default withRouter(connect(
  mapStateToProps,
)(ListHeader));