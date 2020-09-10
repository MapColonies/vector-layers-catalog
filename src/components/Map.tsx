import React, { useMemo } from 'react';
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
import { StyleFunction, Options as StyleOptions } from 'ol/style/Style';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import { LayerState, Shape } from '../model/layerTypes';
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
const mvtOptions = getMVTOptions({
  url: process.env.REACT_APP_MVT_URL as string,
});

const createStyle = (layer: LayerState): Style => {
  let options: StyleOptions;
  switch (layer.shape) {
    case Shape.POINT:
      if (layer.style.useSprite)
        options = { image: iconFactory(layer.style.icon) };
      else
        options = {
          image: new Circle({
            radius: layer.style.circle.radius,
            fill: layer.style.circle.fill
              ? new Fill(layer.style.circle.fill)
              : undefined,
            stroke: layer.style.circle.stroke
              ? new Stroke(layer.style.circle.stroke)
              : undefined,
          }),
        };
      break;
    case Shape.LINE:
      options = { stroke: new Stroke(layer.style.stroke) };
      break;
    case Shape.POLYGON:
      options = {
        fill: layer.style.fill ? new Fill(layer.style.fill) : undefined,
        stroke: layer.style.stroke ? new Stroke(layer.style.stroke) : undefined,
      };
      break;
  }
  if (layer.text !== undefined) {
    options.text = new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      placement: layer.shape === Shape.LINE ? 'line' : 'point',
      fill: new Fill({
        color: 'white',
      }),
      stroke: new Stroke({
        color: 'black',
      }),
    });
  }
  return new Style(options);
};

const getStyleFunc = (layers: LayerState[], styles: Style[]): StyleFunction => {
  const func: StyleFunction = (feature, zoom) => {
    const props = feature.getProperties();
    const layerIndex = layers.findIndex(
      (layer) =>
        layer.show &&
        props.layer === layer.layer &&
        (layer.type === undefined || layer.type.includes(props.type))
    );
    if (layerIndex >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (layers[layerIndex].text !== undefined) {
        styles[layerIndex]
          .getText()
          .setText(props[layers[layerIndex].text as string]);
      }
      return styles[layerIndex];
    }
  };
  return func;
};

const Map: React.FC = () => {
  const [layers] = useLayers();
  const layersString = JSON.stringify(layers);
  const styleFunc = useMemo(() => {
    const styles = layers.map((layer) => createStyle(layer));
    return getStyleFunc(layers, styles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersString]);
  return (
    <div style={styles.map}>
      <OLMap projection={Proj.WEB_MERCATOR}>
        <TileLayer>
          <TileXYZ options={xyzOptions} />
        </TileLayer>
        <VectorTileLayer style={styleFunc}>
          <MVTSource options={mvtOptions} />
        </VectorTileLayer>
      </OLMap>
    </div>
  );
};

export default Map;
