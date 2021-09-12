export const randomNumber = (min = 0, max = 30) => {
  const calcMin = Math.ceil(min);
  const calcMax = Math.floor(max);
  return Math.floor(Math.random() * (calcMax - calcMin)) + calcMin;
}