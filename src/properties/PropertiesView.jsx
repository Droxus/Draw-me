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

import { Point } from '../drawables/point';
import { useGlobalContext } from '../GlobalContext';
import { useSelectedShape } from '../hooks';

["position", "rotation", "color", "border", "width", "height"];

const NumberInput = ({ label, value, onChange, units = "px" }) => {
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

const PositionProperty = ({ value, onChange, title = "Position" }) => (
  <Stack direction="column" spacing={1}>
    <Typography variant="caption">{title}</Typography>
    <Stack direction="row" spacing={1}>
      <NumberInput
        label="X"
        value={value.x}
        onChange={(event) =>
          onChange({
            ...event,
            target: {
              ...event.target,
              value: new Point(event.target.value, value.y),
            },
          })
        }
      />
      <NumberInput
        label="Y"
        value={value.y}
        onChange={(event) =>
          onChange({
            ...event,
            target: {
              ...event.target,
              value: new Point(value.x, event.target.value),
            },
          })
        }
      />
    </Stack>
  </Stack>
);

const RendererByProperty = {
  position: PositionProperty,
  startPoint: (props) => <PositionProperty {...props} title="Start Point" />,
  endPoint: (props) => <PositionProperty {...props} title="End Point" />,
  rotation: ({ value, onChange }) => (
    <NumberInput
      label="Rotation"
      value={value}
      onChange={onChange}
      units="rad"
    />
  ),
  color: ({ value, onChange }) => {
    return (
      <TextField
        label="Fill color"
        type="color"
        value={value}
        onChange={onChange}
        size="small"
      />
    );
  },
  border: ({ value, onChange }) => {
    return (
      <Stack direction="column" spacing={1}>
        <Typography variant="caption">Border</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{ flexGrow: 1 }}
            label="Color"
            type="color"
            value={value.color}
            onChange={(event) => {
              value.color = event.target.value;
              onChange({ ...event, target: { ...event.target, value } });
            }}
            size="small"
            fullWidth
          />
          <NumberInput
            label="Thickness"
            value={value.width}
            onChange={(event) => {
              value.width = event.target.value;
              onChange({ ...event, target: { ...event.target, value } });
            }}
          />
        </Stack>
      </Stack>
    );
  },
  width: ({ value, onChange }) => (
    <NumberInput label="Width" value={value} onChange={onChange} />
  ),
  height: ({ value, onChange }) => (
    <NumberInput label="Height" value={value} onChange={onChange} />
  ),
  text: ({ value, onChange }) => {
    return (
      <TextField
        label="Text"
        value={value}
        onChange={onChange}
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
  const [[selected], setSelected] = useState([]);
  useEffect(() => {
    console.debug("selectedShape", selectedShape);
    if (selectedShape) {
      setSelected([selectedShape]);
      const listener = (event, shape) => {
        setSelected([shape]);
      };
      selectedShape.addListener(listener);
      return () => selectedShape.removeListener(listener);
    } else {
      setSelected([scene]);
    }
  }, [scene, selectedShape]);
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
              value={selected[property]}
              onChange={(event) => {
                selected[property] = event.target.value;
                scene.update();
              }}
            />
          );
        })}
    </Stack>
  );
}
