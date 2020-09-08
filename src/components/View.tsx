import React, { useReducer } from 'react';
import { LayerState, initialState } from '../layers';
import Menu from './Menu';
import Map from './Map';

const reducer = (state: LayerState[], index: number): LayerState[] => {
  state[index].show = !state[index].show;
  return [...state];
};

const View: React.FC = () => {
  const [layers, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Map layers={layers} />
      <Menu layers={layers} updateVisibility={dispatch} />
    </>
  );
};

export default View;
