import React from 'react';
import Form from './Form';
import Input from './Input';
import Section from './Section';
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

export class Parent extends React.Component {
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
            <h4> 範例2-3 (example2AirBnB.js) </h4>
            <h4> <a href="https://medium.com/airbnb-engineering/recent-web-performance-fixes-on-airbnb-listing-pages-6cd8d93df6f4" target="_blank">airbnb 文章範例</a> </h4>
            <Form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                @
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.state.username}
                  onChange={() => {}}
                />
              </label>
            </Form>
            <Child content={content} />
            <Child content={content1} />
          </Section>
        </div>
      </Container>
    );
  }
}

  
@visualizeRender()
class Child extends React.Component {
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
export default enhance(Parent);