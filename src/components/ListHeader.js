import React, { PropTypes } from 'react';
import pluralize from 'pluralize';
import { withRouter } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getActiveRoutine } from '../reducers';
import * as actions from '../actions'
import H1TextBox from './H1TextBox';
import '../styles/ListHeader.scss';

const ListHeader = ({ name, type, dispatch, addObject, active, router, editable, id }) => {
  return (
    <div className='list-header'>
      <Row>
        <Col sm={9}>
        {editable ? 
          <H1TextBox type={type} value={name} /> :
          <h1>{capitalizeFirstWord(pluralize(type))}</h1>
        }
        </Col>
        <Col sm={3}>
        <Button 
          bsSize='large' 
          onClick={() => {
            dispatch(actions[addObject]('New ' + type, id)).then((result) => {
              router.push('/routines/' + result.id); 
            });
          } 
            
        }>
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