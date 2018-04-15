
import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const selectUsername = createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

export {
  selectHome,
  makeSelectUsername,
  selectUsername,
};
