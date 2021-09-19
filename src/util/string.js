export const uniqueString = () =>
  (Math.random().toString(16) + '0000000').substr(2, 10);

export const printLabel = (menuName, menuSize) =>
  `${menuName} (${menuSize[0].toUpperCase()})`;
