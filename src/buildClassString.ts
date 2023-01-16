import { twMerge } from "tailwind-merge";

import { VariantProps, BuildClassStringProps  } from "./types";

export const buildClassString = (variants:VariantProps[],props:BuildClassStringProps) => {
  let classes: { [key: string]: any } = {};
  let propsObject: { [key: string]: any } = {};
  let variantProps: Array<string> = [];

  variants?.forEach((variant) => {
    let availableProps = Object.keys(variant?.props);

    availableProps
      .filter((prop) => !variantProps.includes(prop))
      .forEach((prop) => {
        variantProps = [...variantProps, prop];
      });
  });

  const componentProps = Object.keys(props)
    .filter((key) => variantProps.includes(key))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: props[key] });
    }, propsObject);

  variants?.forEach((variant) => {
    const vProps = Object.keys(variant?.props);
    const requiredProps = vProps.filter((prop) => variantProps.includes(prop));

    if (requiredProps?.length) {
      const someNoMatch = requiredProps?.some((requiredProp) => {
        return (
          componentProps?.[requiredProp] !== variant?.props?.[requiredProp]
        );
      });

      if (!someNoMatch || variant?.props?.name === "default") {
        Object.keys(variant?.classNames)?.forEach((classKey) => {
          const existingClassNames = classes?.[classKey]
            ? classes[classKey]
            : "";
          classes = {
            ...classes,
            [classKey]: twMerge(
              `${existingClassNames} ${variant?.classNames?.[classKey]}${
                classKey === "root"
                  ? `${props?.overrides ? ` ${props.overrides}` : ""}`
                  : ``
              }`
            ),
          };
        });
      }
    }
  });

  return classes;
};

export default buildClassString;
