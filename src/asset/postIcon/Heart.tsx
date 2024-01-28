import React from 'react';

interface PropsType {
  onClick?: () => void;
  fill?: string;
  width?: string;
  height?: string;
}

const Heart = (props: PropsType) => {
  const { fill, width, height } = props;
  return (
    <svg
      width={width ? width : '41'}
      height={height ? height : '40'}
      viewBox="0 0 41 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip1_2538_5577)">
        <path
          d="M29.1667 3.19336C27.2899 3.22255 25.4541 3.74645 23.8446 4.71214C22.2351 5.67784 20.9089 7.05114 20 8.69336C19.0911 7.05114 17.7649 5.67784 16.1554 4.71214C14.5459 3.74645 12.7101 3.22255 10.8333 3.19336C7.84158 3.32334 5.02286 4.63212 2.99298 6.83375C0.963111 9.03538 -0.112906 11.9509 1.18645e-05 14.9434C1.18645e-05 22.5217 7.97668 30.7984 14.6667 36.41C16.1604 37.6652 18.0489 38.3534 20 38.3534C21.9511 38.3534 23.8396 37.6652 25.3333 36.41C32.0233 30.7984 40 22.5217 40 14.9434C40.1129 11.9509 39.0369 9.03538 37.007 6.83375C34.9772 4.63212 32.1584 3.32334 29.1667 3.19336ZM23.1917 33.86C22.2983 34.6123 21.1679 35.0249 20 35.0249C18.8321 35.0249 17.7017 34.6123 16.8083 33.86C8.24501 26.675 3.33335 19.7817 3.33335 14.9434C3.21941 12.8346 3.94396 10.7662 5.34895 9.18953C6.75395 7.61281 8.7254 6.65561 10.8333 6.52669C12.9413 6.65561 14.9127 7.61281 16.3177 9.18953C17.7227 10.7662 18.4473 12.8346 18.3333 14.9434C18.3333 15.3854 18.5089 15.8093 18.8215 16.1219C19.1341 16.4344 19.558 16.61 20 16.61C20.442 16.61 20.866 16.4344 21.1785 16.1219C21.4911 15.8093 21.6667 15.3854 21.6667 14.9434C21.5527 12.8346 22.2773 10.7662 23.6823 9.18953C25.0873 7.61281 27.0587 6.65561 29.1667 6.52669C31.2746 6.65561 33.2461 7.61281 34.6511 9.18953C36.0561 10.7662 36.7806 12.8346 36.6667 14.9434C36.6667 19.7817 31.755 26.675 23.1917 33.8534V33.86Z"
          fill={fill ? 'none' : 'black'}
        />
      </g>
      <path
        d="M23.8527 4.51879C25.4622 3.55309 27.298 3.02919 29.1747 3C32.1665 3.12998 34.9852 4.43876 37.0151 6.64039C39.045 8.84202 40.121 11.7575 40.0081 14.75C40.0081 22.3283 32.0314 30.605 25.3414 36.2167C23.8477 37.4719 21.9591 38.16 20.0081 38.16C18.057 38.16 16.1684 37.4719 14.6747 36.2167C7.98474 30.605 0.00806851 22.3283 0.00806851 14.75C-0.104849 11.7575 0.971168 8.84202 3.00104 6.64039C5.03091 4.43876 7.84964 3.12998 10.8414 3C12.7182 3.02919 14.554 3.55309 16.1635 4.51879C17.773 5.48448 19.0991 6.85778 20.0081 8.5C20.917 6.85778 22.2432 5.48448 23.8527 4.51879Z"
        fill={fill ? fill : 'none'}
      />
    </svg>
  );
};

export default Heart;
