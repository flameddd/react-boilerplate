import React from 'react';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import styled from 'styled-components';
import { visualizeRender } from 'react-global-render-visualizer';
import { createSelector } from 'reselect';

const selector = createSelector(
  (state) => state.username, // "flameddd"
  (parameter1) => ({
    name: parameter1
  })
);

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
    const ChildProps = selector(this.state)

    return (
      <Container>
        <div>
          <Section>
            <h4> 範例2-2 (example2ObjReselect.js) </h4>
            <h4> props 是 reselect </h4>
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