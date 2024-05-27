import {
  useEffect,
  useState,
} from 'react';

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
} from '@mui/icons-material';
import {
  Divider,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import { MODE } from '../constants';
import { ShapeFactory } from '../drawables/factory';
import { useGlobalContext } from '../GlobalContext';
import { Controls } from './';
import { ControlButton } from './ControlButton';

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
          <ControlButton
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createCircle);
            }}
            icon={<CircleOutlined />}
            label="Circle"
          />
          <ControlButton
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createRectangle);
            }}
            icon={<RectangleOutlined />}
            label="Rectangle"
          />
          <ControlButton
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createTriangle);
            }}
            icon={<ChangeHistoryOutlined />}
            label="Triangle"
          />
          <ControlButton
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createLine);
            }}
            icon={<RemoveOutlined />}
            label="Line"
          />
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
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.createNextShapeWith(ShapeFactory.createLabel);
            }}
            icon={<AbcOutlined />}
            label="Label"
          />
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              controls.mode = MODE.DRAW;
            }}
            icon={<BrushOutlined />}
            label="Brush"
          />
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
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => (controls.mode = MODE.MOVE)}
            icon={<OpenWithOutlined />}
            label="Move"
          />
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => (controls.mode = MODE.SELECT)}
            icon={<ContentCopyOutlined />}
            label="Copy"
          />
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
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => {
              importRef.click();
            }}
            icon={<FileUploadOutlined />}
            label="Import"
          />
          <ControlButton
            sx={{ borderRadius: 2 }}
            onClick={() => scene.export(`draw_me-${new Date().getTime()}.png`)}
            icon={<FileDownloadOutlined />}
            label="Export"
          />
          <VisuallyHiddenInput
            type="file"
            ref={setImportRef}
            onChange={importFile}
            accept="image/*"
          />
        </Stack>
        <Typography variant="caption">Image</Typography>
      </Stack>
    </Stack>
  );
}
