import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const RoutineList = ({ routines, onRoutineClick }) => (
  <div className='routine-list'>
    <Table bordered>
      <tbody>
      {routines.map((routine) => (
        <tr key={routine.id}>
          <td>{routine.title}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  </div>
);

RoutineList.propTypes = {
  routines: PropTypes.array.isRequired,
}


export default RoutineList;