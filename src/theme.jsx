import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  app: {
    headerHeight: 100,
    sidePanelWidth: 250,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue color similar to the toolbar in classic Paint
    },
    secondary: {
      main: "#ff4081", // A nice accent color for secondary elements
    },
    background: {
      default: "#f5f5f5", // Light grey background for a clean look
      paper: "#ffffff", // White background for paper elements like canvas
    },
    text: {
      primary: "#333333", // Dark text for good readability
      secondary: "#666666", // Slightly lighter text for secondary information
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Similar to the default system font
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px", // Rounded corners for buttons
          textTransform: "none", // Avoid uppercasing button text
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Blue toolbar background
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "1rem", // Padding for paper elements
        },
      },
    },
  },
});

export default theme;
