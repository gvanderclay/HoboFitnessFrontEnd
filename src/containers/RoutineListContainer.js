import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllRoutines } from '../reducers';
import * as actions from '../actions';
import ListContainer from './ListContainer';

class RoutineListContainer extends Component {
  render() {
    const { routines } = this.props;
    return ( 
        <ListContainer 
          listType="Routine" 
          objects={routines} 
          fetchObjects={actions.fetchRoutines}
          addObject={'addRoutine'}
        />
    );
  }
}

RoutineListContainer.propTypes = {
  routines: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    routines: getAllRoutines(state),
  }
}

RoutineListContainer = connect(
  mapStateToProps
)(RoutineListContainer);

export default RoutineListContainer;
