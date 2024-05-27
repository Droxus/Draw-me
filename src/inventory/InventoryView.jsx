import { Fragment } from 'react';

import {
  AbcOutlined,
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
  ListItemIcon,
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
        {shapes.map((shape) => {
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
            <ListItem
              key={shape.id}
              disablePadding
              action={
                <IconButton
                  edge="end"
                  aria-label="move"
                  onClick={console.debug}
                >
                  <ArrowUpwardOutlined />
                </IconButton>
              }
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    scene.remove(shape.id);
                    scene.update();
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              }
            >
              <ListItemButton
                selected={
                  !!selectedShape && !!shape && selectedShape.id == shape.id
                }
                onClick={() => controls.select(shape.position)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <Typography variant="span">{shape.name}</Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
