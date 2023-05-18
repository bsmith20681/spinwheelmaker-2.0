export const winWheelPercentToDegrees = (percentValue) => {
  let degrees = 0;

  if (percentValue > 0 && percentValue <= 100) {
    let divider = percentValue / 100;
    degrees = 360 * divider;
  }

  return degrees;
};
