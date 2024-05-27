import './App.css';

import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { ControlsView } from './controls';
import { InventoryView } from './inventory/InventoryView';
import { PropertiesView } from './properties/PropertiesView';
import { SceneView } from './scene/SceneView';

function App() {
  const theme = useTheme();
  return (
    <Stack direction="column" width="100%" height="100%">
      <Stack component="header" direction="row" alignItems="center" spacing={1}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          px={1}
        >
          <Typography
            variant="h1"
            fontSize={32}
            fontWeight="bold"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            DRAW ME
          </Typography>
        </Stack>
        <ControlsView />
      </Stack>
      <Divider orientation="horizontal" />
      <Stack direction="row" flexGrow={1}>
        <Box
          component="aside"
          width={theme.app.sidePanelWidth}
          xs={2}
          py={4}
          px={2}
        >
          <PropertiesView />
        </Box>
        <Divider orientation="vertical" />
        <Box component="main" flexGrow={1}>
          <SceneView />
        </Box>
        <Divider orientation="vertical" />
        <Box
          component="aside"
          width={theme.app.sidePanelWidth}
          xs={2}
          py={4}
          px={2}
        >
          <InventoryView />
        </Box>
      </Stack>
    </Stack>
  );
}

export default App;
