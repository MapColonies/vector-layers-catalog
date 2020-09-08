import React, { useState } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent,
  Fab,
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
} from '@map-colonies/react-core';
import { LayerState } from '../layers';

const styles = {
  fab: {
    position: 'absolute' as const,
    margin: '10px',
  },
};

interface MenuProps {
  layers: LayerState[];
  updateVisibility: (index: number) => void;
}

const Menu: React.FC<MenuProps> = ({ layers, updateVisibility }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Fab
        icon="layers"
        onClick={() => setOpen(!open)}
        style={styles.fab}
      ></Fab>
      <Drawer open={open} modal onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Vector Layers Catalog</DrawerTitle>
          <DrawerSubtitle>Layers:</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            {layers.map((layer, i) => (
              <ListItem key={i} onClick={() => updateVisibility(i)}>
                <ListItemGraphic icon={layer.show ? 'check' : ''} />
                <ListItemText>
                  <ListItemPrimaryText>{layer.name}</ListItemPrimaryText>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
