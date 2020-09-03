import React from 'react';
import {
  Map,
  TileLayer,
  TileOsm,
} from '@map-colonies/react-components';

const styles = {
  map: {
    width: '100%',
    height: '100%',
    position: 'fixed' as const
  }
}

const View: React.FC = () => {
  return (
    <div style={styles.map}>
      <Map>
        <TileLayer>
          <TileOsm/>
        </TileLayer>
      </Map>
    </div>
  );
};

export default View;