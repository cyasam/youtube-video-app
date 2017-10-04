export const convertToHTML = (string) => {
  return string.replace(/(?:\r\n|\r|\n)/g, '<br />');
};