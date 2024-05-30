import {
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

export function ControlButton({ onClick, icon, label, currentMode }) {
  return (
    <IconButton sx={{ borderRadius: 2 }} onClick={onClick}>
      <Stack direction="column" justifyContent="center" alignItems="center" color={(currentMode == label) ? "black" : "grey"}>
        {icon}
        <Typography variant="caption">{label}</Typography>
      </Stack>
    </IconButton>
  );
}
