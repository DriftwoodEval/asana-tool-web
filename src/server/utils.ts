const colorMap = {
  none: "#c5c5c5",
  red: "#ff878a",
  orange: "#fea06a",
  "yellow-orange": "#f7bd51",
  yellow: "#f6d861",
  "yellow-green": "#c3e684",
  green: "#85d7a2",
  "blue-green": "#77d3e9",
  aqua: "#a1e7dd",
  blue: "#79abff",
  indigo: "#b8acff",
  purple: "#e39ef2",
  magenta: "#faaee9",
  "hot-pink": "#ff95c9",
  pink: "#ffafc1",
  "cool-gray": "#aaa",
};

export const asanaColorMap = {
  "dark-teal": "aqua",
  "light-blue": "blue",
  "light-purple": "purple",
};

export function isColorKey(key: string): key is keyof typeof colorMap {
  return key in colorMap;
}

export function getColorFromMap(key: string): string {
  return colorMap[key as keyof typeof colorMap];
}

export function mapAsanaColor(color: string): string {
  return asanaColorMap[color as keyof typeof asanaColorMap] ?? color;
}
