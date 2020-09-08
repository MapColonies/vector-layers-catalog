import React from 'react';
import {
  Map as OLMap,
  TileLayer,
  TileXYZ,
} from '@map-colonies/react-components';
import { VectorTileLayer } from '@map-colonies/react-components/dist/ol-map/layers/vector-tile-layer';
import {
  getMVTOptions,
  MVTSource,
} from '@map-colonies/react-components/dist/ol-map/source/mvt';
import { Proj } from '@map-colonies/react-components/dist/ol-map/projections';
import { StyleFunction } from 'ol/style/Style';
import { LayerState } from '../layers';

const styles = {
  map: {
    width: '100%',
    height: '100%',
    position: 'fixed' as const,
  },
};

const xyzOptions = {
  url: process.env.REACT_APP_XYZ_URL,
};
const mvtOptions = {
  url: process.env.REACT_APP_MVT_URL as string,
};

const getStyleFunc = (layers: LayerState[]): StyleFunction => {
  const func: StyleFunction = (feature, zoom) => {
    const props = feature.getProperties();
    const layer = layers.find(
      (layer) =>
        layer.show &&
        props.layer === layer.layer &&
        (layer.type === undefined || layer.type.includes(props.type))
    );
    if (layer) return layer.style;
  };
  return func;
};

interface MapProps {
  layers: LayerState[];
}

const Map: React.FC<MapProps> = ({ layers }) => {
  return (
    <div style={styles.map}>
      <OLMap projection={Proj.WEB_MERCATOR}>
        <TileLayer>
          <TileXYZ options={xyzOptions} />
        </TileLayer>
        <VectorTileLayer style={getStyleFunc(layers)}>
          <MVTSource options={getMVTOptions(mvtOptions)} />
        </VectorTileLayer>
      </OLMap>
    </div>
  );
};

export default Map;
