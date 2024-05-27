import { useEffect, useState } from "react";

import {
  AbcOutlined,
  BrushOutlined,
  ChangeHistoryOutlined,
  CircleOutlined,
  ContentCopyOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  OpenWithOutlined,
  RectangleOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Stack, styled, Typography } from "@mui/material";

import { MODE } from "../constants";
import { ShapeFactory } from "../drawables/factory";
import { useGlobalContext } from "../GlobalContext";
import { Controls } from "./";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function ControlsView() {
  const { scene, controls, setControls } = useGlobalContext();
  const [importRef, setImportRef] = useState(null);
  useEffect(() => {
    if (scene) {
      const controller = new Controls(scene);
      setControls(controller);
      return () => {
        controller.destroy();
      };
    }
  }, [scene]);
  const importFile = (event) =>
    controls.createNextShapeWith(({ x, y }) =>
      ShapeFactory.createImage({
        x,
        y,
        path: URL.createObjectURL(event.target.files[0]),
      })
    );

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      spacing={2}
      py={1}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createCircle);
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CircleOutlined />
              <Typography variant="caption">Circle</Typography>
            </Stack>
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createRectangle);
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <RectangleOutlined />
              <Typography variant="caption">Rectangle</Typography>
            </Stack>
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createTriangle);
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <ChangeHistoryOutlined />
              <Typography variant="caption">Triangle</Typography>
            </Stack>
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createLine);
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <RemoveOutlined />
              <Typography variant="caption">Line</Typography>
            </Stack>
          </IconButton>
        </Stack>
        <Typography variant="caption">Shapes</Typography>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createLabel);
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <AbcOutlined />
              <Typography variant="caption">Label</Typography>
            </Stack>
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.mode = MODE.DRAW;
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <BrushOutlined />
              <Typography variant="caption">Brush</Typography>
            </Stack>
          </IconButton>
        </Stack>
        <Typography variant="caption">Tools</Typography>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => (controls.mode = MODE.MOVE)}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <OpenWithOutlined />
              <Typography variant="caption">Move</Typography>
            </Stack>
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => (controls.mode = MODE.SELECT)}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <ContentCopyOutlined />
              <Typography variant="caption">Copy</Typography>
            </Stack>
          </IconButton>
        </Stack>
        <Typography variant="caption">Selection</Typography>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              importRef.click();
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <FileUploadOutlined />
              <Typography variant="caption">Import</Typography>
            </Stack>
            <VisuallyHiddenInput
              type="file"
              ref={setImportRef}
              onChange={importFile}
              accept="image/*"
            />
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={() => scene.export(`draw_me-${new Date().getTime()}.png`)}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <FileDownloadOutlined />
              <Typography variant="caption">Export</Typography>
            </Stack>
          </IconButton>
        </Stack>
        <Typography variant="caption">Image</Typography>
      </Stack>
    </Stack>
  );
}
