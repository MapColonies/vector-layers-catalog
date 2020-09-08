import React, { createContext, useContext } from 'react';
import { LayerState } from '../layers';

const layersContext = createContext<
  [LayerState[], React.Dispatch<number>] | null
>(null);
export const LayersProvider = layersContext.Provider;

export const useLayers = (): [LayerState[], React.Dispatch<number>] => {
  const layers = useContext(layersContext);
  if (layers === null) {
    throw new Error("layers shouln't be null");
  }
  return layers;
};
