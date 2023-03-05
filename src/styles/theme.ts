const colors = {
  //font
  main: '#F35F4C',
  second: '#0047FF',
  subTitle: '#666',
  blueTitle: '#718AFF',
  blueBanner: '#B9EAFF',
  borderColor: '#e1e1e1',
  hoverMain: '#00a18d',
  buttonText: '#fff',
  grayText: '#333',
};

const fontSizes = {
  titleSize: '24px',
  xxxlg: '22px',
  xxlg: '20px',
  xlg: '18px',
  large: '16px',
};

const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '920px',
  web: '1199px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  web: `screen and (max-width: ${deviceSizes.web})`,
};
const theme = {
  colors,
  fontSizes,
  device,
};

export default theme;
