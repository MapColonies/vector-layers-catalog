import React, { useMemo } from 'react';
import {
  getWMSOptions,
  getWMTSOptions,
  getXYZOptions,
  getMVTOptions,
  WMSOptionParams,
  WMTSOptionParams,
  XYZOptionParams,
  Map as OLMap,
  TileLayer,
  VectorTileLayer,
  TileWMS,
  TileWMTS,
  TileXYZ,
  MVTSource,
  Proj,
} from '@map-colonies/react-components';
import { StyleFunction, Options as StyleOptions } from 'ol/style/Style';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import { LayerState, Shape } from '../model/layerTypes';
import { useLayers } from '../providers/LayersProvider';
import { iconFactory } from '../utils/iconFactory';
import { Config, RasterConfig, RasterType } from '../model/configType';
import VectorInfo from './VectorInfo';
import { Options as XYZOptions } from 'ol/source/XYZ';
import { Options as WMTSOptions } from 'ol/source/WMTS';
import { Options as WMSOptions } from 'ol/source/TileWMS';

const styles = {
  map: {
    width: '100%',
    height: '100%',
    position: 'fixed' as const,
  },
};

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

const getRasterOptions = ({ type, params }: RasterConfig) => {
  switch (type) {
    case RasterType.XYZ:
      return getXYZOptions(params as XYZOptionParams);
    case RasterType.WMS:
      return getWMSOptions(params as WMSOptionParams);
    case RasterType.WMTS:
      return getWMTSOptions(params as WMTSOptionParams);
  }
};

interface MapProps {
  config: Config;
}

const Map: React.FC<MapProps> = ({ config }) => {
  const [layers] = useLayers();

  const layersString = JSON.stringify(layers);
  const styleFunc = useMemo(() => {
    const styles = layers.map((layer) => createStyle(layer));
    return getStyleFunc(layers, styles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersString]);

  const options = useMemo(
    () => ({
      raster: getRasterOptions(config.raster),
      mvt: getMVTOptions(config.mvt.params),
    }),
    [config]
  );

  const { type } = config.raster;
  return (
    <div style={styles.map}>
      <OLMap projection={Proj.WEB_MERCATOR}>
        <TileLayer>
          {type === RasterType.XYZ ? (
            <TileXYZ options={options.raster as XYZOptions} />
          ) : type === RasterType.WMS ? (
            <TileWMS options={options.raster as WMSOptions} />
          ) : (
            <TileWMTS options={options.raster as WMTSOptions} />
          )}
        </TileLayer>
        <VectorTileLayer style={styleFunc}>
          <MVTSource options={options.mvt} />
        </VectorTileLayer>
        <VectorInfo />
      </OLMap>
    </div>
  );
};

export default Map;
