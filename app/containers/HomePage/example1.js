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

export class Example extends React.Component {
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
            <h4> 範例1 </h4>
            <h4>
              Reac.Component's shouldcomponentupdate defualt return <span style={{ color: "red" }}>true</span>
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
            <ShowName username={this.state.username} />
          </Section>
        </div>
      </Container>
    );
  }
}


@visualizeRender()
class ShowName extends React.Component {
  render() {
    return (<span>{this.props.username}</span>)
  }
}

export default Example;