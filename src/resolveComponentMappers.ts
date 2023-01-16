import buildClassString from "./buildClassString";

export const resolveComponentMappers = (
  props: { [key: string]: any },
  config: { componentsMapper: any; variantsMapper: any }
) => {
  const { componentsMapper, variantsMapper } = config;

  if (!props?.__typename) {
    console.log(`"__typename" not found in "${JSON.stringify(props)}"`);
    return {
      Component: null,
    };
  }

  const { __typename } = props;

  if (!componentsMapper?.[__typename]) {
    console.log(
      `Component "${__typename}" not found. Make sure it's in the components mapper file.`
    );
    return {
      Component: null,
    };
  }

  const Component = componentsMapper[__typename];
  const variants = variantsMapper?.[__typename];

  let componentProps = { ...props };

  const classNames = buildClassString(variants, componentProps);

  componentProps = { ...componentProps, classNames };

  return {
    Component,
    componentProps,
  };
};

export default resolveComponentMappers;
