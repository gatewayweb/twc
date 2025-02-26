import { twMerge } from "tailwind-merge";

import { BuildClassStringProps } from "./types";

export const buildClassString = (
  variantObject: any,
  props: BuildClassStringProps
) => {
  let propsObject: { [key: string]: any } = {};
  let variantProps: Array<string> = [];

  const copyVariantObject = { ...variantObject };

  const defaultClasses: any = copyVariantObject?.base ?? {};

  if (!variantObject || !variantObject?.variants || !props)
    return defaultClasses;

  const variants: any[] = [...copyVariantObject?.variants];

  let classes: { [key: string]: any } = { ...defaultClasses };

  variants?.forEach((variant) => {
    if (variant?.props) {
      let availableProps = Object.keys(variant?.props ?? {});

      availableProps
        .filter((prop) => !variantProps.includes(prop))
        .forEach((prop) => {
          variantProps = [...variantProps, prop];
        });
    }
  });

  const componentProps = Object.keys(props ?? {})
    .filter((key) => variantProps.includes(key))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: props[key] });
    }, propsObject);

  variants?.forEach((variant) => {
    if (variant?.props) {
      const vProps = Object.keys(variant?.props ?? {});
      const requiredProps = vProps.filter((prop) =>
        variantProps.includes(prop)
      );

      if (requiredProps?.length) {
        const someNoMatch = requiredProps?.some((requiredProp) => {
          const propValue = variant?.props?.[requiredProp];

          if (Array.isArray(propValue)) {
            return !propValue.includes(componentProps?.[requiredProp]);
          } else if (
            typeof propValue === "object" &&
            Object.prototype.toString.call(propValue) == "[object RegExp]"
          ) {
            const regexTest = new RegExp(propValue);

            return !regexTest.test(componentProps?.[requiredProp]);
          }
          return componentProps?.[requiredProp] !== propValue;
        });

        if (!someNoMatch) {
          Object.keys(variant?.classNames ?? {})?.forEach((classKey) => {
            const existingClassNames = classes?.[classKey]
              ? classes[classKey]
              : "";
            classes = {
              ...classes,
              [classKey]: twMerge(
                `${defaultClasses[classKey]} ${existingClassNames} ${
                  variant?.classNames?.[classKey]
                }${
                  classKey === "root"
                    ? `${props?.overrides ? ` ${props.overrides}` : ""}`
                    : ``
                }`
              ),
            };
          });
        } else {
          Object.keys(variant?.classNames ?? {})?.forEach((classKey) => {
            if (!classes?.[classKey] && defaultClasses?.[classKey]) {
              classes[classKey] = defaultClasses[classKey];
            }
          });
        }
      }
    }
  });

  return classes;
};

export default buildClassString;
