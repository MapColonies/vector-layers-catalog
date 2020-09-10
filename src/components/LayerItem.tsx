import React, { useState } from 'react';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
  ListItemMeta,
} from '@map-colonies/react-core';
import { Popover } from '@map-colonies/react-components';
import { ChromePicker } from 'react-color';
import { LayerState, Shape } from '../model/layerTypes';
import { useLayers } from '../providers/LayersProvider';
import { toggleShow, setColor } from '../actions';

const style = {
  colorDiv: {
    width: '23px',
    height: '23px',
    // borderWidth: '2px',
    borderRadius: '3px',
    // borderStyle: 'solid',
    boxShadow: '1px 1px 3px 0px grey',
  },
};

interface LayerItemProps {
  layer: LayerState;
  index: number;
}

const LayerItem: React.FC<LayerItemProps> = ({ layer, index }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const dispatch = useLayers()[1];
  const initialColor = (): string | undefined => {
    switch (layer.shape) {
      case Shape.LINE:
        return layer.style.stroke.color as string;
      case Shape.POINT:
        return !layer.style.useSprite
          ? (layer.style.circle.fill?.color as string)
          : undefined;
      case Shape.POLYGON:
        return layer.style.fill?.color as string;
    }
  };
  const [pickerColor, setPickerColor] = useState(initialColor());
  const openPicker = !!anchorEl;
  return (
    <>
      <ListItem onClick={(): void => dispatch(toggleShow(index))}>
        <ListItemGraphic icon={layer.show ? 'check' : ''} />
        <ListItemText>
          <ListItemPrimaryText>{layer.name}</ListItemPrimaryText>
        </ListItemText>
        {pickerColor !== undefined && (
          <ListItemMeta>
            <div
              style={{
                ...style.colorDiv,
                backgroundColor: pickerColor,
              }}
              onClick={(event): void => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              }}
            ></div>
          </ListItemMeta>
        )}
      </ListItem>
      <Popover
        open={openPicker}
        anchorEl={anchorEl}
        onClose={(): void => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <ChromePicker
          color={pickerColor}
          onChange={({ rgb }): void => {
            const { r, g, b, a } = rgb;
            setPickerColor(`rgb(${r},${g},${b},${a ?? 1})`);
          }}
          onChangeComplete={({ rgb }): void => {
            const { r, g, b, a } = rgb;
            dispatch(setColor(index, `rgb(${r},${g},${b},${a ?? 1})`));
          }}
        />
      </Popover>
    </>
  );
};

export default LayerItem;
