import {
  useEffect,
  useState,
} from 'react';

import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useGlobalContext } from '../GlobalContext';
import { useSelectedShape } from '../hooks';

["position", "rotation", "color", "border", "width", "height"];

const NumberInput = ({ label, value: propValue, onChange, units = "px" }) => {
  const [value, setValue] = useState(propValue);
  useEffect(() => {
    setValue(value);
  }, [propValue]);
  return (
    <TextField
      label={label}
      value={value}
      type="text"
      onChange={(event) => {
        const value = parseFloat(
          event.target.value.slice(0, 4) || "0"
        ).toString(10);
        if (/^[\d|\.?]+$/g.test(value) || value === "") {
          setValue(value);
          onChange({ ...event, target: { ...event.target, value } });
        }
      }}
      size="small"
      InputProps={{
        endAdornment: <InputAdornment position="end">{units}</InputAdornment>,
      }}
    />
  );
};

const PositionProperty = ({ shape, scene, property, title = "Position" }) => (
  <Stack direction="column" spacing={1}>
    <Typography variant="caption">{title}</Typography>
    <Stack direction="row" spacing={1}>
      <NumberInput
        label="X"
        value={shape[property]?.x}
        onChange={(event) => {
          shape.position.x = event.target.value;
          scene.update();
        }}
      />
      <NumberInput
        label="Y"
        value={shape[property]?.y}
        onChange={(event) => {
          shape.position.y = event.target.value;
          scene.update();
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
    <NumberInput
      label="Rotation"
      value={shape.rotation}
      onChange={(event) => {
        shape.rotation = event.target.value;
        scene.update();
      }}
      units="rad"
    />
  ),
  color: ({ shape, scene, property }) => {
    const [value, setValue] = useState(shape.color);
    useEffect(() => {
      setValue(shape.color);
    }, [shape.color]);
    return (
      <TextField
        key={`${shape.id}-${property}`}
        label="Fill color"
        type="color"
        value={value}
        onChange={(event) => {
          shape.color = event.target.value;
          scene.update();
          setValue(event.target.value);
        }}
        size="small"
      />
    );
  },
  border: ({ shape, scene, property }) => {
    const [color, setColor] = useState();
    useEffect(() => {
      setColor(shape.border.color);
    }, [shape.border.color]);
    const [width, setWidth] = useState(shape.border.width);
    useEffect(() => {
      setWidth(shape.border.width);
    }, [shape.border.width]);
    return (
      <Stack direction="column" spacing={1}>
        <Typography variant="caption">Border</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{ flexGrow: 1 }}
            label="Color"
            type="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
              shape.border.color = event.target.value;
              scene.update();
            }}
            size="small"
            fullWidth
          />
          <NumberInput
            label="Thickness"
            value={width}
            onChange={(event) => {
              setWidth(event.target.value);
              shape.border.width = event.target.value;
              scene.update();
            }}
          />
        </Stack>
      </Stack>
    );
  },
  width: ({ shape, scene, property }) => (
    <NumberInput
      label="Width"
      value={shape.width}
      onChange={(event) => {
        shape.width = event.target.value > 0 ? event.target.value : shape.width;
        scene.update();
      }}
    />
  ),
  height: ({ shape, scene, property }) => (
    <NumberInput
      label="Height"
      value={shape.height}
      onChange={(event) => {
        shape.height =
          event.target.value > 0 ? event.target.value : shape.height;
        scene.update();
      }}
    />
  ),
  text: ({ shape, scene, property }) => {
    const [value, setValue] = useState(shape[property]);
    useEffect(() => {
      setValue(shape[property]);
    }, [shape[property]]);
    return (
      <TextField
        label="Text"
        value={value}
        onChange={(event) => {
          shape[property] = event.target.value;
          scene.update();
          setValue(event.target.value);
        }}
        size="small"
        InputProps={{
          multiline: true,
        }}
      />
    );
  },
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
