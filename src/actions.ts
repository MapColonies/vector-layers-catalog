import {
  ActionTypes,
  ToggleShowAction,
  SetColorAction,
} from './model/actionTypes';

export function toggleShow(index: number): ToggleShowAction {
  return {
    type: ActionTypes.TOGGLE_SHOW,
    index,
  };
}

export function setColor(index: number, color: string): SetColorAction {
  return {
    type: ActionTypes.SET_COLOR,
    index,
    color,
  };
}
