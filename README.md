# tailwind component variants

A simple & powerful component system based on [Tailwind](https://tailwindcss.com). The variant system uses [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) behind the scenes to make sure no classes are duplicated.

## how to use:

### install

```
pnpm add @gateway-web/twc
```

### example

You can see a full demo here: [https://tailwindcss-components.vercel.app/](https://tailwindcss-components.vercel.app/)

```
import { twc, Variants } from "@gateway-web/twc";

// Create variants
const variants: Variants = {
  base: { // base class names
    root: "flex flex-col w-full gap-4 border p-8 rounded",
    title: "text-xl font-bold",
    button: "p-2 rounded",
  },
  variants: [
    {
      props: {
        color: "amber", // string matching
      },
      classNames: {
        root: "border-amber-400",
        title: "text-amber-400",
        button: "bg-amber-600 text-white",
      },
    },
    {
      props: {
        color: ["primary", "blue"], // array matching
      },
      classNames: {
        root: "border-blue-400",
        title: "text-blue-400",
        button: "bg-blue-600 text-white",
      },
    },
    {
      props: {
        color: /violet|purple/gi, // regex matching
      },
      classNames: {
        root: "border-violet-500",
        title: "text-violet-400",
        button: "bg-violet-600 text-white",
      },
    },
    {
      props: {
        color: "purple", // last one will always override
      },
      classNames: {
        button: "bg-purple-600",
      },
    }
  ],
};

// Create component and use twc to generate Tailwind classes
const Component = (props) => {
  const classes = twc(variants, props);

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>title</h3>
      <button className={classes.button}>button</button>
    </div>
  )
}
```

### use the component

```
<Component color="blue" />

<Component color="purple" />
```
