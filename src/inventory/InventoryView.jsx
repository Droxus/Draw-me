import { Fragment } from 'react';

import {
  AbcOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  BrushOutlined,
  ChangeHistoryOutlined,
  CircleOutlined,
  DeleteOutline,
  ImageOutlined,
  RectangleOutlined,
  RemoveOutlined,
} from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
  Zoom,
} from '@mui/material';

import { useGlobalContext } from '../GlobalContext';
import { useSelectedShape } from '../hooks/useSelectedShape';
import { useShapes } from '../hooks/useShapes';

export function InventoryView() {
  const { scene, controls } = useGlobalContext();
  const selectedShape = useSelectedShape();
  const shapes = useShapes();
  return (
    <Stack direction="column" spacing={1} height={"90%"} overflow={"scroll"}>
      <Typography variant="h6">Inventory list</Typography>
      {shapes.length === 0 && (
        <Typography fontStyle="italic">Scene is empty</Typography>
      )}
      <List height={"90%"} overflow={"scroll"}>
        {shapes
          .slice()
          .reverse()
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
              : type.includes("brush")
              ? BrushOutlined
              : Fragment;
            return (
              <Fragment key={shape.id} >
                <Zoom in>
                  <ListItem disableGutters>
                    <ListItemButton
                      disableGutters
                      disableRipple
                      selected={
                        !!selectedShape &&
                        !!shape &&
                        selectedShape.id == shape.id
                      }
                      onClick={() => controls.selectById(shape.id)}
                    >
                      <Stack
                        direction="column"
                        spacing={0}
                        alignItems="center"
                        flexGrow={1}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="start"
                          alignItems="center"
                          alignSelf="start"
                        >
                          <Icon
                            sx={{
                              bgcolor:
                                type == "label"
                                  ? shape.border?.color
                                  : shape.border?.color
                                  ? shape.color
                                  : null,
                              color:
                                type === "label"
                                  ? shape.color
                                  : shape.border?.color ?? shape.color,
                            }}
                          />
                          <Stack
                            direction="column"
                            spacing={0}
                            justifyContent="center"
                            alignItems="start"
                          >
                            <Typography variant="subtitle2">
                              {shape.type}
                            </Typography>
                            <Typography variant="caption" fontStyle="italic">
                              {shape.id}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={0}
                          justifyContent="center"
                        >
                          <IconButton
                            title="bring forward"
                            disabled={index === 0}
                            onClick={() => {
                              shape.layerIndex += 1;
                              scene.update();
                            }}
                          >
                            <ArrowUpwardOutlined />
                          </IconButton>
                          <IconButton
                            disabled={index === theseShapes.length - 1}
                            title="bring backward"
                            onClick={() => {
                              shape.layerIndex -= 1;
                              scene.update();
                            }}
                          >
                            <ArrowDownwardOutlined />
                          </IconButton>
                          <IconButton
                            title="delete"
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
                </Zoom>
                <Divider flexItem orientation="horizontal" />
              </Fragment>
            );
          })}
      </List>
    </Stack>
  );
}
