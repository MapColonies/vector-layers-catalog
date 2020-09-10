import React, { useReducer } from 'react';
import { initialState } from '../layers';
import { LayersProvider } from '../providers/LayersProvider';
import { reducer } from '../reducer';
import Menu from './Menu';
import Map from './Map';

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
