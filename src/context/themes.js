// Har bir tema — to'liq mustaqil rang tokenlari to'plami.
// CSS custom propertylar orqali butun saytga qo'llanadi.

export const themes = {
  signal: {
    id: "signal",
    label: "Signal",
    swatch: "#3D5AFE",
    tokens: {
      "--ink": "#0B0E11",
      "--ink-2": "#11151A",
      "--ink-3": "#171C22",
      "--paper": "#EDEFF2",
      "--paper-dim": "#9AA3AD",
      "--line": "#23282F",
      "--accent": "#3D5AFE",
      "--accent-dim": "#3D5AFE33",
      "--accent-2": "#3DFF8A",
    },
  },
  ember: {
    id: "ember",
    label: "Ember",
    swatch: "#FF6B35",
    tokens: {
      "--ink": "#100C0A",
      "--ink-2": "#17120F",
      "--ink-3": "#1F1814",
      "--paper": "#F4EFE9",
      "--paper-dim": "#A89C8E",
      "--line": "#2A2117",
      "--accent": "#FF6B35",
      "--accent-dim": "#FF6B3533",
      "--accent-2": "#FFC857",
    },
  },
  violet: {
    id: "violet",
    label: "Violet",
    swatch: "#A78BFA",
    tokens: {
      "--ink": "#0E0B14",
      "--ink-2": "#15101D",
      "--ink-3": "#1C1626",
      "--paper": "#EFEAF7",
      "--paper-dim": "#A39BB5",
      "--line": "#241D31",
      "--accent": "#A78BFA",
      "--accent-dim": "#A78BFA33",
      "--accent-2": "#34E2C8",
    },
  },
  paper: {
    id: "paper",
    label: "Light",
    swatch: "#1D4ED8",
    tokens: {
      "--ink": "#FAFAF8",
      "--ink-2": "#F1F1EE",
      "--ink-3": "#E8E8E4",
      "--paper": "#15161A",
      "--paper-dim": "#5B5E66",
      "--line": "#DCDCD6",
      "--accent": "#1D4ED8",
      "--accent-dim": "#1D4ED81F",
      "--accent-2": "#0EA86C",
    },
  },
};

export const themeOrder = ["signal", "ember", "violet", "paper"];
