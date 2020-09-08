import React, { useReducer } from 'react';
import { Style, Stroke, Circle, Fill, Icon } from 'ol/style';
import Menu from './Menu';
import Map from './Map';

export interface LayerState {
  name: string;
  layer: string;
  type?: string;
  style: Style;
  show: boolean;
}

const SMALL_ICON_SIZE = 15;
const LARGE_ICON_SIZE = 19;
const BUS_STOP_XOFFSET = 374;
const BUS_STOP_YOFFSET = 0;
const GAS_STATION_XOFFSET = 366;
const GAS_STATION_YOFFSET = 124;

const initialState = [
  {
    name: 'Bus Stops',
    layer: 'transport_points',
    type: 'bus_stop',
    style: new Style({
      image: new Icon({
        size: [SMALL_ICON_SIZE, SMALL_ICON_SIZE],
        offset: [BUS_STOP_XOFFSET, BUS_STOP_YOFFSET],
        src: 'osm-liberty.png',
      }),
    }),
    show: false,
  },
  {
    name: 'Gas Stations',
    layer: 'amenity_points',
    type: 'fuel',
    style: new Style({
      image: new Icon({
        size: [LARGE_ICON_SIZE, LARGE_ICON_SIZE],
        offset: [GAS_STATION_XOFFSET, GAS_STATION_YOFFSET],
        src: 'osm-liberty.png',
      }),
    }),
    show: false,
  },
  {
    name: 'Roads',
    layer: 'transport_lines',
    style: new Style({
      stroke: new Stroke({ color: 'rgb(255, 255, 255, 0.6)', width: 3 }),
    }),
    show: false,
  },
  {
    name: 'Traffic Lights',
    layer: 'transport_points',
    type: 'traffic_signals',
    style: new Style({
      image: new Circle({ radius: 5, fill: new Fill({ color: 'chocolate' }) }),
    }),
    show: false,
  },
  {
    name: 'Parks',
    layer: 'landuse_areas',
    type: 'park',
    style: new Style({
      fill: new Fill({ color: 'rgb(204, 255, 153, 0.4)' }),
      stroke: new Stroke({ color: 'rgb(34, 139, 34)', width: 2 }),
    }),
    show: false,
  },
];

const reducer = (state: LayerState[], index: number) => {
  state[index].show = !state[index].show;
  return [...state];
};

const View: React.FC = () => {
  const [layers, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Map layers={layers} />
      <Menu layers={layers} updateVisibility={dispatch} />
    </>
  );
};

export default View;
