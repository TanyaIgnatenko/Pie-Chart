export const makeAsFirstChildOf = (
  parent: HTMLElement | SVGElement,
  child: HTMLElement | SVGElement,
) => {
  parent.removeChild(child);
  parent.prepend(child);
};
