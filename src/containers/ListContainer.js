import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import LoadingError from '../components/LoadingError';

class ListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { fetchObjects, dispatch } = this.props;
    dispatch(fetchObjects()); 
  }
  
  render() {
    const { listType, isLoading, errorMessage, objects, addObject } = this.props;
    if(isLoading&& !objects.length) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      )
    }
    if(errorMessage && !objects.length) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    
    return (
      <div className="container">
        <ListHeader type={listType} addObject={addObject}/>
        <List 
          objects={objects}
          onObjectClick={() => {}}
        />
      </div>
    );
  }
}

ListContainer.propTypes = {
  errorMessage: PropTypes.string,
  objects: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addObject: PropTypes.string.isRequired,
  fetchObjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    routineId: params.routineId || undefined,
    workoutId: params.workoutId || undefined,
    exerciseId: params.exerciseId || undefined,
  }
}

ListContainer = withRouter(connect(
  mapStateToProps,
)(ListContainer));

export default ListContainer;