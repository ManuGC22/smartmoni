import { Dimensions } from "react-native";

// Constants
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// width, ml, mr, mx, pl, pr, px, likewise
const scale = (size: number) => (screenWidth / guidelineBaseWidth) * size;

// height, mt, mb, my, line-height, pt, pb, py, likewise
const vscale = (size: number) => (screenHeight / guidelineBaseHeight) * size;

// font-sizes, borders (-radius), likewise
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const hexToRGB = (hex: string, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Mixins = {
  scale,
  s: scale,
  vscale,
  vs: vscale,
  ms: moderateScale,
  hexToRGB,
};

export default Mixins;
