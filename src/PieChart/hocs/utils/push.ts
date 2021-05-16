import { getRightTriangleX, getRightTriangleY } from '../../../utils/math';

type Push = (
  sliceNode: SVGElement,
  midAngle: number,
  distanceOnPush: number,
) => void;

type UnpushSliceNode = (
  sliceNode: SVGElement,
  midAngle: number,
  distanceOnPush: number,
) => void;

export const pushSliceNode: Push = (sliceNode, midAngle, distanceOnPush) => {
  const dx = getRightTriangleX(midAngle, distanceOnPush);
  const dy = -getRightTriangleY(midAngle, distanceOnPush);

  sliceNode.style.transform = `translate(${dx}px, ${dy}px)`;
};

export const unpushSliceNode = (sliceNode: SVGElement) => {
  sliceNode.style.transform = 'translate(0, 0)';
};
