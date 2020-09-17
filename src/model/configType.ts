import {
  WMTSOptionParams,
  WMSOptionParams,
  XYZOptionParams,
  MVTOptionParams,
} from '@map-colonies/react-components';

export interface Config {
  raster: RasterConfig;
  mvt: {
    params: MVTOptionParams;
  };
}

export type RasterConfig =
  | {
      type: RasterType.XYZ;
      params: XYZOptionParams;
    }
  | {
      type: RasterType.WMS;
      params: WMSOptionParams;
    }
  | {
      type: RasterType.WMTS;
      params: WMTSOptionParams;
    };

export enum RasterType {
  XYZ = 'xyz',
  WMS = 'wms',
  WMTS = 'wmts',
}

export type RasterParams = RasterConfig['params'];
