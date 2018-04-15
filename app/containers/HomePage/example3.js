import React from 'react';
import PropTypes from 'prop-types';
import ReposList from 'components/ReposList';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { selectUsername } from './selectors';
import { createSelector, createStructuredSelector } from 'reselect';

const Container = styled.article`
  flex-basis: 50%;
  min-width: 50%;
  border: 1px solid;
`;

export class Parent extends React.PureComponent {
  state = {
    username: "flameddd",
    reposListProps: [],
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`按下 Enter (${new Date().getMilliseconds()})`)
    this.props.onSubmitForm();
  }

  render() {
    console.log("example3 render");
    return (
      <Container>
        <div>
          <Section>
            <h4> 範例3 (example3.js) </h4>
            <h4> react-redux </h4>
            <Form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                @
                <Input
                  type="text"
                  value={this.props.username}
                  onChange={() => {}}
                />
              </label>
            </Form>
            <ReposList repos={this.props.repos} />
          </Section>
        </div>
      </Container>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername("flameddd")),
    onSubmitForm: () => dispatch(loadRepos())
  }
};

const testConnect = () => {
  console.log("example3 執行 mapStateToProps ");
  return true;
}

const addPrefix = repos => repos
  ? repos.map((repo, index) => {
    console.log(`執行第 ${index + 1} 次`);
    repo.name = "@" + repo.name;
    return repo
  })
  : null;

// repos: addPrefix(state.getIn(['global', 'userData', 'repositories'])),
// repos: state.getIn(['global', 'userData', 'repositories']),
const selectRepos = createSelector(
  (state) => state.getIn(['global', 'userData', 'repositories']),
  (repos) => addPrefix(repos)
);
// selectRepos(state),

// const mapStateToProps = state => ({
//   repos: state.getIn(['global', 'userData', 'repositories']),
//   username: selectUsername(state),
//   testConnect: testConnect(),
// });

const mapStateToProps = createStructuredSelector({
  repos: selectRepos,
  username: selectUsername,
})



const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Parent);