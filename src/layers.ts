import { Style, Stroke, Circle, Fill } from 'ol/style';
import { iconFactory } from './utils/iconFactory';

export interface LayerState {
  name: string;
  layer: string;
  type?: string[];
  style: Style;
  show: boolean;
}

export const initialState = [
  {
    name: 'Inter City Roads',
    layer: 'transport_lines',
    type: ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'],
    style: new Style({
      stroke: new Stroke({ color: 'rgb(255, 255, 255, 0.6)', width: 3 }),
    }),
    show: true,
  },
  {
    name: 'City Roads',
    layer: 'transport_lines',
    type: ['residential'],
    style: new Style({
      stroke: new Stroke({ color: 'rgb(204, 204, 0, 0.6)', width: 3 }),
    }),
    show: true,
  },
  {
    name: 'Footway Roads',
    layer: 'transport_lines',
    type: ['footway', 'pedestrian'],
    style: new Style({
      stroke: new Stroke({ color: 'rgb(204, 255, 153, 0.6)', width: 3 }),
    }),
    show: true,
  },
  {
    name: 'Parks',
    layer: 'landuse_areas',
    type: ['park'],
    style: new Style({
      fill: new Fill({ color: 'rgb(204, 255, 153, 0.4)' }),
      stroke: new Stroke({ color: 'rgb(34, 139, 34)', width: 2 }),
    }),
    show: false,
  },
  {
    name: 'Benches',
    layer: 'amenity_points',
    type: ['bench'],
    style: new Style({
      image: iconFactory('picnic-site-11'),
    }),
    show: false,
  },
  {
    name: 'Restaurants',
    layer: 'amenity_points',
    type: ['fast_food', 'restaurant', 'cafe'],
    style: new Style({
      image: iconFactory('restaurant-11'),
    }),
    show: false,
  },
  {
    name: 'Bus Stops',
    layer: 'transport_points',
    type: ['bus_stop'],
    style: new Style({
      image: iconFactory('bus-11'),
    }),
    show: false,
  },
  {
    name: 'Gas Stations',
    layer: 'amenity_points',
    type: ['fuel'],
    style: new Style({
      image: iconFactory('fuel-15'),
    }),
    show: false,
  },
  {
    name: 'Traffic Lights',
    layer: 'transport_points',
    type: ['traffic_signals'],
    style: new Style({
      image: new Circle({ radius: 5, fill: new Fill({ color: 'chocolate' }) }),
    }),
    show: false,
  },
];
