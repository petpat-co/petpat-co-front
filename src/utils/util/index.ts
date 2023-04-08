export const allowExt =
  'bmp|gif|jpg|jpeg|png|raw|tif|heif|ts|mp4|avi|mov|wmv|mkv|mpg|rm|asf|m4v|mpeg|mpg'
    .split('|')
    .map((el) => `image/${el}`)
    .join(',');
