export interface StringProps {
  [key: string]: any;
}

export interface VariantProps {
  props: StringProps;
  classNames: StringProps;
}

export interface BuildClassStringProps {
  [key: string]: any
}

export interface MapperConfigProps {
  componentsMapper: any;
  variantsMapper: any;
}