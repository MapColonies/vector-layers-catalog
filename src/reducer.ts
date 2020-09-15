import { LayerState, Shape } from './model/layerTypes';
import { ReducerActions, ActionTypes } from './model/actionTypes';

export const reducer = (
  state: LayerState[],
  action: ReducerActions
): LayerState[] => {
  const layer = state[action.index];
  switch (action.type) {
    case ActionTypes.TOGGLE_SHOW:
      layer.show = !layer.show;
      break;
    case ActionTypes.SET_COLOR:
      switch (layer.shape) {
        case Shape.POLYGON:
          if (layer.style.fill) layer.style.fill.color = action.color;
          break;
        case Shape.LINE:
          layer.style.stroke.color = action.color;
          break;
        case Shape.POINT:
          if (!layer.style.useSprite && layer.style.circle.fill) {
            layer.style.circle.fill.color = action.color;
          }
          break;
      }
      break;
  }
  return [...state];
};
