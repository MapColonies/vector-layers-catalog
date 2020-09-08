import { Icon } from 'ol/style';
import { osmLiberty } from '../osm-liberty';

export const iconFactory = (iconName: keyof typeof osmLiberty): Icon => {
  const iconSprite = osmLiberty[iconName];
  return new Icon({
    size: [iconSprite.width, iconSprite.height],
    offset: [iconSprite.x, iconSprite.y],
    src: 'osm-liberty.png',
  });
};
