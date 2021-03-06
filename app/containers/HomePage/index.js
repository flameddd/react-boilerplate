/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Ex1 from './example1';
import Example1Log from './example1Log';
import EX2 from './example2';
import EX2Obj from './example2Obj';
import EX2ObjReselect from './example2ObjReselect';
import EX2Bnb from './example2AirBnB';
import EX3 from './example3';
import EX3Test from './example3testStatus';

import styled from 'styled-components';

const Conatiner = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              淺談 react 優化(Avoid Reconciliation) 和 reselect。
            </H2>
          </CenteredSection>
        </div>
        <Conatiner>
          <Ex1 />
          <Example1Log />
          <EX2 />
          <EX2Obj />
          <EX2ObjReselect />
          <EX2Bnb />
          <EX3 />
          <EX3Test />

        </Conatiner>
      </article>
    );
  }
}

export default HomePage;
