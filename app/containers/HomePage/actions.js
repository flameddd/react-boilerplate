
import {
  CHANGE_USERNAME,
  CHANGE_STATUS,
} from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function changeStatus() {
  return {
    type: CHANGE_STATUS,
  };
}