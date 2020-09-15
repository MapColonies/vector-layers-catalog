import React, { createContext, useContext } from 'react';
import { LayerState } from '../model/layerTypes';
import { ReducerActions } from '../model/actionTypes';

const layersContext = createContext<
  [LayerState[], React.Dispatch<ReducerActions>] | null
>(null);
export const LayersProvider = layersContext.Provider;

export const useLayers = (): [LayerState[], React.Dispatch<ReducerActions>] => {
  const layers = useContext(layersContext);
  if (layers === null) {
    throw new Error("layers shouln't be null");
  }
  return layers;
};
