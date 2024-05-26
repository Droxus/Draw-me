import "./App.css";

import * as React from "react";
import { useState } from "react";

import {
  AbcOutlined,
  BrushOutlined,
  ChangeHistoryOutlined,
  CircleOutlined,
  ContentCopyOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  RectangleOutlined,
  SelectAllOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import theme from "./theme";

function App() {
  const [selected, setSelected] = useState(false);
  return (
    <ThemeProvider theme={theme}>
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            spacing={2}
            py={1}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircleOutlined />
                    <Typography variant="caption">Circle</Typography>
                  </Stack>
                </IconButton>
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <RectangleOutlined />
                    <Typography variant="caption">Rectangle</Typography>
                  </Stack>
                </IconButton>
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ChangeHistoryOutlined />
                    <Typography variant="caption">Triangle</Typography>
                  </Stack>
                </IconButton>
              </Stack>
              <Typography variant="caption">Shapes</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <AbcOutlined />
                    <Typography variant="caption">Label</Typography>
                  </Stack>
                </IconButton>
                <IconButton sx={{ borderRadius: 2 }}>
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
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SelectAllOutlined />
                    <Typography variant="caption">Select</Typography>
                  </Stack>
                </IconButton>
                <IconButton sx={{ borderRadius: 2 }}>
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
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FileDownloadOutlined />
                    <Typography variant="caption">Import</Typography>
                  </Stack>
                </IconButton>
                <IconButton sx={{ borderRadius: 2 }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FileUploadOutlined />
                    <Typography variant="caption">Export</Typography>
                  </Stack>
                </IconButton>
              </Stack>
              <Typography variant="caption">Image</Typography>
            </Stack>
          </Stack>
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
              <Typography variant="h6">%selected shape% Properties</Typography>
              <TextField
                label="Width"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid component="main" flexGrow={1}>
            <Box
              component="canvas"
              bgcolor="red"
              width="100%"
              height="100%"
              onClick={() => {
                setSelected((prev) => !prev);
              }}
            ></Box>
          </Grid>
        </Grid>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
