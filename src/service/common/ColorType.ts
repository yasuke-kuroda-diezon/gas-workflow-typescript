export const ColorType = {
  GREEN: "#00c100",
  BLUE: "#4d91f7",
  RED: "#ff0909",
  BLACK: "#000000",
} as const;

export type ColorType = (typeof ColorType)[keyof typeof ColorType];
