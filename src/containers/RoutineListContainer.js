import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row, Button } from 'react-bootstrap';
import { getAllRoutines, getErrorMessage, getIsLoading } from '../reducers';
import List from '../components/List';
import LoadingError from '../components/LoadingError';
import { fetchRoutines, addRoutine } from '../actions'
import '../styles/ListHeader.scss';

class RoutineListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { dispatch } = this.props;
    dispatch(fetchRoutines());
  }
  
  render() {
    const { isLoading, errorMessage, routines, router, dispatch } = this.props;
    if(isLoading&& !routines.length) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      )
    }
    if(errorMessage && !routines.length) {
      return (
        <LoadingError
          message={errorMessage}
          onRetry={() => this.fetchData}
        />
      );
    }
    
    return (
      <div className="container list-header">
        <Row>
          <Col sm={9}>
            <h1>Routines</h1>
          </Col>
          <Col sm={3}>
          <Button 
            bsSize='large' 
            onClick={() => {
              dispatch(addRoutine('New Routine')).then((result) => {
                router.push('/routines/' + result.id); 
              });
            } 
              
          }>
            + New Routine
          </Button>
          </Col>
        </Row>
        <List 
          objects={routines}
          onObjectClick={() => {}}
        />
      </div>
    );
  }
}

RoutineListContainer.propTypes = {
  errorMessage: PropTypes.string,
  routines: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    routines: getAllRoutines(state),
  }
}

RoutineListContainer = withRouter(connect(
  mapStateToProps,
)(RoutineListContainer));

export default RoutineListContainer;