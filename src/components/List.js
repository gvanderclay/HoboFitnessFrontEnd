import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const List = ({ objects, actionComponents }) => (
  <div className='routine-list'>
    <Table bordered>
      <tbody>
      {objects.map((object) => {
        const actions = actionComponents(object);
        console.log(actions);
        return (
          <tr key={object.id}>
            <td>
              {object.name}
              {actions.map((actionComponent) => {
                return actionComponent;
               })}
            </td>
          </tr>
        );
      })}
      </tbody>
    </Table>
  </div>
);

List.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};


export default List;
