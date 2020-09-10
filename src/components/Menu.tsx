import React, { useState } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent,
  Fab,
  List,
} from '@map-colonies/react-core';
import { useLayers } from '../providers/LayersProvider';
import LayerItem from './LayerItem';

const styles = {
  fab: {
    position: 'absolute' as const,
    margin: '10px',
  },
};

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [layers] = useLayers();
  return (
    <>
      <Fab
        icon="layers"
        onClick={(): void => setOpen(!open)}
        style={styles.fab}
      ></Fab>
      <Drawer open={open} modal onClose={(): void => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Vector Layers Catalog</DrawerTitle>
          <DrawerSubtitle>Layers:</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            {layers.map((layer, i) => (
              <LayerItem key={i} layer={layer} index={i} />
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
