import { Icon } from 'ol/style';
import { spriteMapping } from '../spriteMapping';

export const iconFactory = (iconName: keyof typeof spriteMapping): Icon => {
  const iconSprite = spriteMapping[iconName];
  return new Icon({
    size: [iconSprite.width, iconSprite.height],
    offset: [iconSprite.x, iconSprite.y],
    src: 'sprites.png',
  });
};
