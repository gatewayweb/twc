import buildClassString from "./buildClassString";
import { Variants } from "./types";

interface ReturnObject {
  [key: string]: string;
}

export const twc = (variants: Variants, props: any): ReturnObject => {
  const classNames = buildClassString(variants, { ...props });

  return classNames;
};

export default twc;
