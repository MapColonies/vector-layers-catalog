/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { useMap } from '@map-colonies/react-components';
import Overlay from 'ol/Overlay';

import './VectorInfo.css';

const VectorInfo: React.FC = () => {
  const map = useMap();
  const container = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<Overlay>();
  const [featureInfo, setFeatureInfo] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const over = new Overlay({
      element: container.current as HTMLElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    setOverlay(over);
    map.addOverlay(over);
    return (): void => {
      map.removeOverlay(over);
    };
  }, [map]);

  useEffect(() => {
    map.on('singleclick', (e) => {
      const [feature] = map.getFeaturesAtPixel(e.pixel, { hitTolerance: 2 });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (feature) {
        overlay?.setPosition(e.coordinate);
        setFeatureInfo(feature.getProperties());
      }
    });
  }, [map, overlay]);

  const handleClose = (): void => {
    overlay?.setPosition(undefined);
  };

  return (
    <div ref={container} id="popup" className="ol-popup">
      <a
        href="#"
        id="popup-closer"
        className="ol-popup-closer"
        onClick={handleClose}
      ></a>
      <div id="popup-content">
        {Object.entries(featureInfo).map(([key, value]) => (
          <p key={key}>{`${key}: ${value as string}`}</p>
        ))}
      </div>
    </div>
  );
};

export default VectorInfo;
