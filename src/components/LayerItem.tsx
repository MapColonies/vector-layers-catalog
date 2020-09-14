import React, { useState } from 'react';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
  ListItemMeta,
} from '@map-colonies/react-core';
import { Popover } from '@map-colonies/react-components';
import chroma from 'chroma-js';
import { ChromePicker, RGBColor } from 'react-color';
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
  const initialColor = (): RGBColor | undefined => {
    let color;
    switch (layer.shape) {
      case Shape.LINE:
        color = layer.style.stroke.color as string;
        break;
      case Shape.POINT:
        color = !layer.style.useSprite
          ? (layer.style.circle.fill?.color as string | undefined)
          : undefined;
        break;
      case Shape.POLYGON:
        color = layer.style.fill?.color as string | undefined;
        break;
    }
    if (color === undefined) {
      return undefined;
    }
    const [r, g, b, a] = chroma(color).rgba();
    return { r, g, b, a };
  };
  const [pickerColor, setPickerColor] = useState<RGBColor | undefined>(
    initialColor()
  );
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
                backgroundColor: `rgba(${pickerColor.r},${pickerColor.g},${
                  pickerColor.b
                },${pickerColor.a ?? 1})`,
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
            setPickerColor(rgb);
          }}
          onChangeComplete={({ rgb: { r, g, b, a } }): void => {
            dispatch(setColor(index, `rgba(${r},${g},${b},${a ?? 1})`));
          }}
        />
      </Popover>
    </>
  );
};

export default LayerItem;
