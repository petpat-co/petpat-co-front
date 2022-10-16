const colors = {
  //font
  main: "#00c7ae",
  subTitle: "#666",
  blueTitle: "#718AFF",
  blueBanner: "#B9EAFF",
  borderColor: "#e1e1e1",
  hoverMain: "#00a18d",
  buttonText: "#fff",
};

const fontSizes = {
  titleSize: "24px",
  xxlg: "20px",
  xlg: "18px",
  large: "16px",
};

const deviceSizes = {
  mobile: "375px",
  tablet: "768px",
  laptop: "920px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};
const theme = {
  colors,
  fontSizes,
  device,
};

export default theme;
