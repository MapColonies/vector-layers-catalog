import { Options as FillOptions } from 'ol/style/Fill';
import { Options as StrokeOptions } from 'ol/style/Stroke';
import { spriteMapping } from '../spriteMapping';

export enum Shape {
  POINT = 'POINT',
  LINE = 'LINE',
  POLYGON = 'POLYGON',
}

export interface PointState extends BaseLayerState {
  shape: Shape.POINT;
  style:
    | { useSprite: true; icon: keyof typeof spriteMapping }
    | {
        useSprite: false;
        circle: { radius: number; fill?: FillOptions; stroke?: StrokeOptions };
      };
}
export interface LineState extends BaseLayerState {
  shape: Shape.LINE;
  style: { stroke: StrokeOptions };
}
export interface PolygonState extends BaseLayerState {
  shape: Shape.POLYGON;
  style: {
    fill?: FillOptions;
    stroke?: StrokeOptions;
  };
}
interface BaseLayerState {
  name: string;
  layer: string;
  type?: string[];
  text?: string;
  show: boolean;
}

export type LayerState = PointState | LineState | PolygonState;
