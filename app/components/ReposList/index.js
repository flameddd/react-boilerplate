import React from 'react';
import PropTypes from 'prop-types';
import List from 'components/List';
import RepoListItem from 'containers/RepoListItem';
import { visualizeRender } from 'react-global-render-visualizer';

@visualizeRender()
class ReposList extends React.Component {
  render() {
    if (this.props.repos) {
      return <List items={this.props.repos} component={RepoListItem} />;  
    }
    return <div />;
  }
}

export default ReposList;
