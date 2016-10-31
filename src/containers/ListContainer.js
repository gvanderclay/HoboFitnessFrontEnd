import React, { Component } from 'react';
import { Link } from 'react-router';
import List from '../components/List';

class ListContainer extends Component {
  createLink(link, action) {
    if(!link) {
      return null;
    }
    return id => <Link> className="list-link" to={link.bind(this, id)}>{action}</Link>;
  }

  render() {
    const { startLink, editLink, deleteLink, objects } = this.props;
    return (
        <List
          startLink={this.createLink(startLink, "Start ")}
          editLink={this.createLink(editLink, "Edit ")}
          deleteLink={this.createLink(deleteLink, "Delete ")}
          objects={objects}
        />
    );
  }
}

export default ListContainer;
