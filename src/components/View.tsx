import React, { useReducer } from 'react';
import useAxios from 'axios-hooks';
import { initialState } from '../layers';
import { LayersProvider } from '../providers/LayersProvider';
import { reducer } from '../reducer';
import { Config } from '../model/configType';
import Menu from './Menu';
import Map from './Map';

const View: React.FC = () => {
  const [layers, dispatch] = useReducer(reducer, initialState);
  const [{ data, loading, error }, refetch] = useAxios<Config>('config.json');
  return (
    <LayersProvider value={[layers, dispatch]}>
      {!loading && <Map config={data} />}
      <Menu />
    </LayersProvider>
  );
};

export default View;
