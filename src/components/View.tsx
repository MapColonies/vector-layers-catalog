import React, { useReducer } from 'react';
import { LayerState, initialState } from '../layers';
import { LayersProvider } from '../providers/LayersProvider';
import Menu from './Menu';
import Map from './Map';

const reducer = (state: LayerState[], index: number): LayerState[] => {
  state[index].show = !state[index].show;
  return [...state];
};

const View: React.FC = () => {
  const [layers, dispatch] = useReducer(reducer, initialState);
  return (
    <LayersProvider value={[layers, dispatch]}>
      <Map />
      <Menu />
    </LayersProvider>
  );
};

export default View;
