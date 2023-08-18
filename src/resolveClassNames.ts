import buildClassString from "./buildClassString";

export const twc = (variants: any, props: any) => {
  const classNames = buildClassString(variants, { ...props });

  return classNames;
};

export default twc;
