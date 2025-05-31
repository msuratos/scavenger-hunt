import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from '@mantine/core';

const themeOverride = createTheme({
  colors: {
    "beige": [
      "#fdf6e8",
      "#f3ebda",
      "#eadfc7",
      "#d4bf90",
      "#c7ab6f",
      "#bf9f5a",
      "#bc994e",
      "#a5853e",
      "#937634",
      "#806527"
    ],
    "forest": [
      "#f3f7f3",
      "#e6eae6",
      "#cad4ca",
      "#aabdaa",
      "#90aa8f",
      "#7e9e7e",
      "#759874",
      "#638462",
      "#577556",
      "#324732"
    ],
    "darkorange": [
      "#fff4e8",
      "#f5e7d8",
      "#e7ceb4",
      "#d9b38b",
      "#cd9c69",
      "#c68d53",
      "#c38546",
      "#b17639",
      "#99652f",
      "#865623"
    ]
  },
  primaryColor: 'forest',
  defaultRadius: 5,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);