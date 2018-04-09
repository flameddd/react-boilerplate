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

const nestedContent = {
  name: "flameddd"
}

export class Example extends React.PureComponent {
  state = {
    user: nestedContent
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`按下 Enter (${new Date().getMilliseconds()})`)
    this.setState({ username: "flameddd" })
  }

  // bad
  handleChange = (event) => {
    nestedContent.name = event.target.value;
    console.log(nestedContent);
    // user's value is a Object
    // 淺比較 比較 Object 時，是用 ===
    // 當 變數ref 相同時 就會認為是一樣的，所以不更新
    this.setState({
      user: nestedContent
    })
  }

  // better, always create new object
  handleChange1 = (event) => {
    console.log(event.target.value);
    // user's value is a Object
    // 淺比較 比較 Object 時，是用 ===
    // 當 變數ref 相同時 就會認為是一樣的，所以不更新
    this.setState({
      user: {
        name: event.target.value,
      }
    })
  }


  render() {
    return (
      <Container>
        <div>
          <Section>
            <h4> 範例1 (PureComponent) </h4>
            <h4>
              PureComponent 下，會有 nested 結構、順序等問題．
            </h4>
            <span>（所以都會建議用 PureComponent 時 Never use Mutate var）</span>
            <Form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.state.user.name}
                  onChange={this.handleChange}
                />
              </label>
            </Form>
            <ShowName username={this.state.user.name} />
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