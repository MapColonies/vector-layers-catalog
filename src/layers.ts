import { spriteMapping } from './spriteMapping';

export interface LayerState {
  name: string;
  layer: string;
  type?: string[];
  style: LayerStyle;
  show: boolean;
}

export interface LayerStyle {
  stroke?: {
    color: string;
    width: number;
  };
  fill?: string;
  icon?: keyof typeof spriteMapping;
  point?: number;
}

export const initialState = [
  {
    name: 'Inter City Roads',
    layer: 'transport_lines',
    type: ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'],
    style: { stroke: { color: 'rgb(255, 255, 255, 0.6)', width: 3 } },
    show: true,
  },
  {
    name: 'City Roads',
    layer: 'transport_lines',
    type: ['residential'],
    style: { stroke: { color: 'rgb(204, 204, 0, 0.6)', width: 3 } },
    show: true,
  },
  {
    name: 'Footway Roads',
    layer: 'transport_lines',
    type: ['footway', 'pedestrian'],
    style: { stroke: { color: 'rgb(204, 255, 153, 0.6)', width: 3 } },
    show: true,
  },
  {
    name: 'Parks',
    layer: 'landuse_areas',
    type: ['park'],
    style: {
      fill: 'rgb(204, 255, 153, 0.4)',
      stroke: { color: 'rgb(34, 139, 34)', width: 2 },
    },
    show: false,
  },
  {
    name: 'Benches',
    layer: 'amenity_points',
    type: ['bench'],
    style: { icon: 'picnic-site-11' },
    show: false,
  },
  {
    name: 'Restaurants',
    layer: 'amenity_points',
    type: ['fast_food', 'restaurant', 'cafe'],
    style: { icon: 'restaurant-11' },
    show: false,
  },
  {
    name: 'Bus Stops',
    layer: 'transport_points',
    type: ['bus_stop'],
    style: { icon: 'bus-11' },
    show: false,
  },
  {
    name: 'Gas Stations',
    layer: 'amenity_points',
    type: ['fuel'],
    style: { icon: 'fuel-15' },
    show: false,
  },
  {
    name: 'Traffic Lights',
    layer: 'transport_points',
    type: ['traffic_signals'],
    style: { point: 5, fill: 'chocolate' },
    show: false,
  },
] as LayerState[];
