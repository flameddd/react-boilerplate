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

const Container = styled.article`
  flex-basis: 50%;
  min-width: 50%;
  border: 1px solid;
`;

export class Parent extends React.Component {
  state = {
    username: "flameddd",
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`按下 Enter (${new Date().getMilliseconds()})`)
    this.setState({ username: "flameddd" })
  }

  render() {
    return (
      <Container>
        <div>
          <Section>
            <h4> 範例2 (example2.js) </h4>
            <h4> 使用 shouldComponentUpdate 避免 wasted redner </h4>
            <Form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                @
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={() => {}}
                />
              </label>
            </Form>
            <Child username={this.state.username} />
          </Section>
        </div>
      </Container>
    );
  }
}


@visualizeRender()
class Child extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log("console log => componentWillReceiveProps");
  }
  shouldComponentUpdate(nextProps) {
    console.log("console log => shouldComponentUpdate");
    return nextProps.username !== this.props.username;
  }
  componentWillUpdate() {
    console.log("console log => componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("console log => componentDidUpdate");
  }
  
  render() {
    Array.from({ length: 30 }, (v, i) => console.log(`render function for loop: ${i}`))
    return (<span>{this.props.username}</span>)
  }
}

export default Parent;