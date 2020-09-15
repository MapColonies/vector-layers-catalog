export enum ActionTypes {
  TOGGLE_SHOW = 'TOGGLE_SHOW',
  SET_COLOR = 'SET_COLOR',
}

export interface ToggleShowAction {
  type: ActionTypes.TOGGLE_SHOW;
  index: number;
}

export interface SetColorAction {
  type: ActionTypes.SET_COLOR;
  index: number;
  color: string;
}

export type ReducerActions = SetColorAction | ToggleShowAction;
