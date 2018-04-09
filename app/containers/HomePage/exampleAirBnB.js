import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import axios from 'axios';
import request from 'utils/request';
import { requestURL } from 'constants/endpoint.js';
import styled from 'styled-components';
import { visualizeRender } from 'react-global-render-visualizer';
import { compose, withProps } from 'recompose';
import { createSelector } from 'reselect';

const selectContent = createSelector(
  ({ id }) => id,
  ({ name }) => name,
  ({ age }) => age,
  (id, name, age) => ({
    id,
    name,
    age
  })
);

const Container = styled.article`
  flex-basis: 50%;
  min-width: 50%;
  border: 1px solid;
`;

export class Example extends React.Component {
  state = {
    username: "flameddd",
    age: 18,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`按下 Enter (${new Date().getMilliseconds()})`)
    this.setState({ username: "flameddd" })
  }

  render() {
    const content = {
      id: this.props.id,
      username: this.state.username,
      age: this.state.age,
    }
    const content1 = selectContent({
      id: this.props.id,
      username: this.state.username,
      age: this.state.age,
    })
    return (
      <Container>
        <div>
          <Section>
            <h4> <a href="https://medium.com/airbnb-engineering/recent-web-performance-fixes-on-airbnb-listing-pages-6cd8d93df6f4" target="_blank">airbnb 文章範例</a> </h4>
            <h4>
              Reac.Component
            </h4>
            <Form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.state.username}
                  onChange={() => {}}
                />
              </label>
            </Form>
            <ShowName content={content} />
            <ShowName content={content1} />
          </Section>
        </div>
      </Container>
    );
  }
}

  
@visualizeRender()
class ShowName extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.content !== nextProps.content
  }
  
  render() {
    const { id, username, age } = this.props.content;
    return (
      <div>
        <span>ＩＤ：{id}</span><br />
        <span>name：{username}</span><br />
        <span>age：{age}</span>
      </div>
    )
  }
}


const enhance = compose(
  withProps(() => ({
    id: 'A1214',
  })),
)
export default enhance(Example);