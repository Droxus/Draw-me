import "./App.css";

import * as React from "react";
import { useState } from "react";

import {
  Divider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { ControlsView } from "./controls";
import { GlobalContext } from "./GlobalContext";
import { SceneView } from "./scene/SceneView";
import theme from "./theme";

function App() {
  const [selected, setSelected] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
        <Stack direction="column" width="100%" height="100%">
          <Stack
            component="header"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              px={1}
            >
              <Typography
                variant="h1"
                fontSize={32}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                DRAW ME
              </Typography>
            </Stack>
            <ControlsView />
          </Stack>
          <Divider orientation="horizontal" />
          <Grid container flexGrow={1} spacing={2}>
            <Grid
              component="aside"
              xs={2}
              py={4}
              px={2}
              display={selected ? "auto" : "none"}
            >
              <Stack direction="column" spacing={2}>
                <Typography variant="h6">
                  %selected shape% Properties
                </Typography>
                <TextField
                  label="Width"
                  id="outlined-size-small"
                  defaultValue="Small"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid component="main" flexGrow={1}>
              <SceneView />
            </Grid>
          </Grid>
        </Stack>
      </GlobalContext>
    </ThemeProvider>
  );
}

export default App;
