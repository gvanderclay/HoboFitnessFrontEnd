import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

const List = ({ objects, editLink, startLink }) => (
  <div className='routine-list'>
    <Table bordered>
      <tbody>
      {objects.map((object) => {
        const boundEdit = editLink.bind(this, object.id); 
        const boundStart = startLink.bind(this, object.id);
        return (
          <tr key={object.id}>
             <td onClick={boundEdit}>
              {object.name}
              <Link style={{
                float: "right",
                marginRight: "10px",
              }}
                to={boundEdit}
              >
                Edit
                {" "}
              </Link>
              <Link style={{
                float: 'right',
                marginRight: "10px",
              }}
               to={boundStart}
              >
                Start
                {" "}
              </Link>
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
  editLink: PropTypes.func.isRequired,
  startLink: PropTypes.func.isRequired,
};


export default List;