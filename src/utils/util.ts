export const allowExt =
  'bmp|gif|jpg|jpeg|png|raw|tif|heif|ts|mp4|avi|mov|wmv|mkv|mpg|rm|asf|m4v|mpeg|mpg'
    .split('|')
    .map((el) => `image/${el}`)
    .join(',');

//p태그 select 안먹게 하는 코드
export const preventDrag = `
	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
  -webkit-user-drag: none;
`;
