import React from 'react';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
} from '@map-colonies/react-core';
import { LayerState } from '../layers';
import { useLayers } from '../providers/LayersProvider';

interface LayerItemProps {
  layer: LayerState;
  index: number;
}

const LayerItem: React.FC<LayerItemProps> = ({ layer, index }) => {
  const dispatch = useLayers()[1];
  return (
    <ListItem onClick={() => dispatch(index)}>
      <ListItemGraphic icon={layer.show ? 'check' : ''} />
      <ListItemText>
        <ListItemPrimaryText>{layer.name}</ListItemPrimaryText>
      </ListItemText>
    </ListItem>
  );
};

export default LayerItem;
