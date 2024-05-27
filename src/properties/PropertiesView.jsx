import {
  debounce as MUIDebounce,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useGlobalContext } from '../GlobalContext';
import { useSelectedShape } from '../hooks';

["position", "rotation", "color", "border", "width", "height"];

const debounce = (fn) => MUIDebounce(fn, 0);

const PositionProperty = ({ shape, scene, property, title = "Position" }) => (
  <Stack direction="column" spacing={1}>
    <Typography variant="caption">{title}</Typography>
    <Stack direction="row" spacing={1}>
      <TextField
        label="X"
        defaultValue={shape[property]?.x}
        onChange={debounce((event) => {
          shape.position.x = event.target.value;
          scene.update();
        })}
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end">px</InputAdornment>,
        }}
      />
      <TextField
        label="Y"
        defaultValue={shape[property]?.y}
        onChange={debounce((event) => {
          shape.position.y = event.target.value;
          scene.update();
        })}
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end">px</InputAdornment>,
        }}
      />
    </Stack>
  </Stack>
);

const RendererByProperty = {
  position: PositionProperty,
  startPoint: (props) => (
    <PositionProperty {...props} property="position" title="Start Point" />
  ),
  endPoint: (props) => <PositionProperty {...props} title="End Point" />,
  rotation: ({ shape, scene, property }) => (
    <TextField
      label="Rotation"
      defaultValue={shape.rotation}
      onChange={debounce((event) => {
        shape.rotation = event.target.value;
        scene.update();
      })}
      size="small"
      InputProps={{
        endAdornment: <InputAdornment position="start">rad</InputAdornment>,
      }}
    />
  ),
  color: ({ shape, scene, property }) => (
    <TextField
      label="Fill color"
      type="color"
      defaultValue={shape.color}
      onChange={debounce((event) => {
        shape.color = event.target.value;
        scene.update();
      })}
      size="small"
    />
  ),
  border: ({ shape, scene, property }) => (
    <Stack direction="column" spacing={1}>
      <Typography variant="caption">Border</Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Color"
          type="color"
          defaultValue={shape.border.color}
          onChange={debounce((event) => {
            shape.border.color = event.target.value;
            scene.update();
          })}
          size="small"
          fullWidth
        />
        <TextField
          label="Thickness"
          type="number"
          defaultValue={shape.border.width}
          onChange={debounce((event) => {
            shape.border.width = event.target.value;
            scene.update();
          })}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">px</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  ),
  width: ({ shape, scene, property }) => (
    <TextField
      label="Width"
      type="number"
      defaultValue={shape.width}
      onChange={debounce((event) => {
        shape.width = event.target.value > 0 ? event.target.value : shape.width;
        scene.update();
      })}
      size="small"
      InputProps={{
        endAdornment: <InputAdornment position="start">px</InputAdornment>,
      }}
    />
  ),
  height: ({ shape, scene, property }) => (
    <TextField
      label="Height"
      type="number"
      defaultValue={shape.height}
      onChange={debounce((event) => {
        shape.height =
          event.target.value > 0 ? event.target.value : shape.height;
        scene.update();
      })}
      size="small"
      InputProps={{
        endAdornment: <InputAdornment position="start">px</InputAdornment>,
      }}
    />
  ),
  text: ({ shape, scene, property }) => (
    <TextField
      label="Text"
      defaultValue={shape[property]}
      onChange={debounce((event) => {
        console.debug("Setting text: %o", event.target.value);
        shape[property] = event.target.value;
        scene.update();
      })}
      size="small"
      InputProps={{
        multiline: true,
      }}
    />
  ),
};

export function PropertiesView() {
  const { scene } = useGlobalContext();
  const selectedShape = useSelectedShape();
  const selected = selectedShape ?? scene;
  if (!selected) return null;
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">
        <Typography variant="span" fontWeight="bold">
          {selected.name}
        </Typography>{" "}
        properties
      </Typography>
      {selected &&
        selected.getProperties().map((property) => {
          const Renderer = RendererByProperty[property];
          if (!Renderer) return null;
          return (
            <Renderer
              key={`${selected.id}-${property}`}
              property={property}
              shape={selected}
              scene={scene}
            />
          );
        })}
    </Stack>
  );
}
