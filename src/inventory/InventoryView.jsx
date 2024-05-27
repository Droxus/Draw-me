import { Fragment } from 'react';

import {
  AbcOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChangeHistoryOutlined,
  CircleOutlined,
  DeleteOutline,
  ImageOutlined,
  RectangleOutlined,
  RemoveOutlined,
} from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';

import { useGlobalContext } from '../GlobalContext';
import { useSelectedShape } from '../hooks/useSelectedShape';
import { useShapes } from '../hooks/useShapes';

export function InventoryView() {
  const { scene, controls } = useGlobalContext();
  const selectedShape = useSelectedShape();
  const shapes = useShapes();
  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">Inventory list</Typography>
      {shapes.length === 0 && (
        <Typography fontStyle="italic">Scene is empty</Typography>
      )}
      <List>
        {shapes
          .slice()
          .sort((a, b) => b.layerIndex - a.layerIndex)
          .map((shape, index, theseShapes) => {
            const type = shape.type.toLowerCase();
            const Icon = type.includes("circle")
              ? CircleOutlined
              : type.includes("rectangle")
              ? RectangleOutlined
              : type.includes("triangle")
              ? ChangeHistoryOutlined
              : type.includes("line")
              ? RemoveOutlined
              : type.includes("label")
              ? AbcOutlined
              : type.includes("picture")
              ? ImageOutlined
              : Fragment;
            return (
              <ListItem key={shape.id} disablePadding disableGutters>
                <ListItemButton
                  selected={
                    !!selectedShape && !!shape && selectedShape.id == shape.id
                  }
                  onClick={() => controls.select(shape.position)}
                >
                  <Stack direction="column" spacing={0} alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Icon />
                      <Typography variant="span">{shape.name}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0}>
                      <IconButton
                        aria-label="move forward"
                        disabled={index === 0}
                        onClick={() => {
                          shape.layerIndex = theseShapes[0].layerIndex + 1;
                          scene.update();
                        }}
                      >
                        <ArrowUpwardOutlined />
                      </IconButton>
                      <IconButton
                        disabled={index === theseShapes.length - 1}
                        aria-label="move backward"
                        onClick={() => {
                          shape.layerIndex =
                            theseShapes[theseShapes.length - 1].layerIndex - 1;
                          scene.update();
                        }}
                      >
                        <ArrowDownwardOutlined />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          scene.remove(shape);
                          scene.update();
                        }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                  </Stack>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
}
