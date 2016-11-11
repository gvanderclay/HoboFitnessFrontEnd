import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const List = ({ objects, actionComponents }) => (
  <div className='routine-list'>
    <Table bordered>
      <tbody>
      {objects.map((object) => {
        const actions = actionComponents(object);
        return (
          <tr key={object.id}>
            <td>
              {object.name}
              {actions.map((actionComponent, index) => {
                return(
                  <span key={index}>
                    {actionComponent}
                  </span>
                );
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
