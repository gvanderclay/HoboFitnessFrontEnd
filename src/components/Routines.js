import React, { PropTypes, Component } from 'react';
import ListHeader from './ListHeader';
import RoutineList from './RoutineList';
import { getAllRoutines } from '../reducers';

class Routines extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { fetchRoutines } = this.props;
    fetchRoutines();
  }
  

  
  render() {
    return (
      <div className="routines container">
        <ListHeader type="Routine" onClick={() => {}}/>
        <RoutineList routines={[{id: 0, title: 'test'}]} />
      </div>
    );
  } 
};

const mapStateToProps = (state, { params }) => {
  routines: getAllRoutines()
}


export default Routines;