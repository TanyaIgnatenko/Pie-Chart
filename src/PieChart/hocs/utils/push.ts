import { getRightTriangleX, getRightTriangleY } from '../../../utils/math';

type Push = (
  pieNode: SVGElement,
  midAngle: number,
  distanceOnPush: number,
) => void;

type UnpushPieItemNode = (
  pieNode: SVGElement,
  midAngle: number,
  distanceOnPush: number,
) => void;

export const pushPieItemNode: Push = (pieNode, midAngle, distanceOnPush) => {
  const dx = getRightTriangleX(midAngle, distanceOnPush);
  const dy = -getRightTriangleY(midAngle, distanceOnPush);

  pieNode.style.transform = `translate(${dx}px, ${dy}px)`;
};

export const unpushPieItemNode = (pieNode: SVGElement) => {
  pieNode.style.transform = 'translate(0, 0)';
};
