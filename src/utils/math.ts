export const ensurePositiveAngleWithin360 = (angle: number) => {
  const angleWithin360 = angle % 360;

  return angleWithin360 < 0 ? 360 - angleWithin360 : angleWithin360;
};

export const getRightTriangleX = (angle: number, hypotenuse: number) => {
  const angleWithin360 = ensurePositiveAngleWithin360(angle);
  const angleRad = toRadians(angleWithin360);

  return Math.cos(angleRad) * hypotenuse;
};

export const getRightTriangleY = (angle: number, hypotenuse: number) => {
  const angleWithin360 = ensurePositiveAngleWithin360(angle);
  const angleRad = toRadians(angleWithin360);

  return Math.sin(angleRad) * hypotenuse;
};

export const svgAngleToStandart = (angle: number) => {
  return (360 - angle) % 360;
};

export const toRadians = (degrees: number) => (degrees / 180) * Math.PI;
