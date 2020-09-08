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
import { StyleFunction, Options } from 'ol/style/Style';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { LayerState, LayerStyle } from '../layers';
import { useLayers } from '../providers/LayersProvider';
import { iconFactory } from '../utils/iconFactory';

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

const createStyle = (layerStyle: LayerStyle): Style => {
  let options: Options = {
    fill: layerStyle.fill ? new Fill({ color: layerStyle.fill }) : undefined,
    stroke: layerStyle.stroke
      ? new Stroke({
          color: layerStyle.stroke.color,
          width: layerStyle.stroke.width,
        })
      : undefined,
  };
  if (layerStyle.icon !== undefined) {
    options = { image: iconFactory(layerStyle.icon) };
  } else if (layerStyle.point !== undefined) {
    options = {
      image: new Circle({
        ...options,
        radius: layerStyle.point,
      }),
    };
  }
  return new Style(options);
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
    if (layer) return createStyle(layer.style);
  };
  return func;
};

const Map: React.FC = () => {
  const [layers] = useLayers();
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
