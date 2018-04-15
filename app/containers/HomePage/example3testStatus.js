import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer2 from './reducer2';
import { changeStatus } from './actions';


const Container = styled.article`
  flex-basis: 50%;
  min-width: 50%;
  border: 1px solid;
`;

export class Parent extends React.PureComponent {

  render() {
    return (
      <Container>
        <button
          style={{ border: "1px solid" }}
          onClick={() => {
            console.log('ex3 setState');
            this.props.changeStatus()
            }}
        >
          state.set('testStatus', true)
        </button>
      </Container>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    changeStatus: () => dispatch(changeStatus()),
  }
};


const withConnect = connect(null, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home2', reducer: reducer2 });

export default compose(
  withReducer,
  withConnect,
)(Parent);
