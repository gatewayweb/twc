export interface StringProps {
  [key: string]: any;
}

export interface VariantProps {
  props: StringProps;
  classNames: StringProps;
}

export interface BuildClassStringProps {
  [key: string]: any;
}

export interface Variant {
  props: {
    [key: string]: RegExp | string[] | string;
  };
  classNames: {
    [key: string]: string;
  };
}
export interface Variants {
  default?: {
    [key: string]: string;
  };
  variants: Variant[];
}
