import buildClassString from "./buildClassString";
import { Variants } from "./types";

interface ReturnObject {
  [key: string]: string;
}

interface TwcOptions {
  cleanFunction?: (props: any) => any;
}

export const twc = <T>(
  variants: Variants | T,
  props: any,
  options?: TwcOptions
): ReturnObject => {
  if (options?.cleanFunction && typeof options.cleanFunction === "function") {
    props = options.cleanFunction(props);
  }

  const classNames = buildClassString(variants, { ...props });

  return classNames;
};

export default twc;
