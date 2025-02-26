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
    [key: string]:
      | RegExp
      | string[]
      | string
      | number
      | boolean
      | undefined
      | null;
  };
  classNames: {
    [key: string]: string;
  };
}
export interface Variants {
  base?: {
    [key: string]: string;
  };
  variants: Variant[];
}
