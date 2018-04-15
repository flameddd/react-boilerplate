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
    const ChildProps = {
      name: this.state.username
    };
    return (
      <Container>
        <div>
          <Section>
            <h4> 範例2-1 (example2Obj.js) </h4>
            <h4> props 是 Object </h4>
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
            <Child user={ChildProps} />
          </Section>
        </div>
      </Container>
    );
  }
}

@visualizeRender()
class Child extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log("nextProps.user => ");
    console.log(nextProps.user);
    return nextProps.user !== this.props.user;
  }
  render() {
    console.log('render function');
    return (<span>{this.props.user.name}</span>)
  }
}

export default Parent;