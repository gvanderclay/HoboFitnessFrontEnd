import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const List = ({ objects, onObjectClick }) => (
  <div className='routine-list'>
    <Table bordered>
      <tbody>
      {objects.map((object) => (
        <tr key={object.id}>
          <td>{object.name}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  </div>
);

List.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onObjectClick: PropTypes.func.isRequired,
};


export default List;