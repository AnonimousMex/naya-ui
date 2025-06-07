import { useWindowDimensions } from "react-native";

export const useScreenDimensions = () => {
  const { width, height } = useWindowDimensions();

  const isSmall = width < 390 || height < 800;

  const logoWidth = width * 0.7;
  const logoHeight = height * 0.25;

  const sloganWidth = width * 0.5;
  const sloganHeight = height * 0.1;

  const cloudOffsetLeft = isSmall ? -60 : -80;
  const cloudOffsetTop = isSmall ? 10 : 20;

  return {
    width,
    height,
    isSmall,
    logoWidth,
    logoHeight,
    sloganWidth,
    sloganHeight,
    cloudOffsetLeft,
    cloudOffsetTop,
  };
};
