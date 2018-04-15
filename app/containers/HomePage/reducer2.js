
import { fromJS } from 'immutable';
import { CHANGE_STATUS } from './constants';

// The initial state of the App
const initialState = fromJS({
  testStatus: true,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATUS:
      return state
        .update('testStatus', testStatus => !testStatus);

    default:
      return state;
  }
}

export default homeReducer;
