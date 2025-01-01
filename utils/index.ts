import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

type ConfigVariants<T extends Record<string, Record<string, string>>> = {
  variants: T;
  defaultVariant: {
    [K in keyof T]: keyof T[K];
  };
};

type CustomConfig<T extends Record<string, Record<string, string>>> = {
  default: string;
  configVariants: ConfigVariants<T>;
};

// export const setClassElementVariants = (
//   props: CustomConfig<{
//     [key: string]: {
//       [key: string]: string;
//     };
//   }>
// ) => {
//   const variant = props.configVariants.variants;
//   const defaultVariant = props.configVariants.defaultVariant;
//   const defaultVariantKeys = Object.keys(defaultVariant);
//   const classsDefault = defaultVariantKeys.map((key) => variant[key][defaultVariant[key]]);
//   //   const variantKeys = Object.keys(props.configVariants.variants);
//   //   const classVariant = variantKeys.map((key) => variant[key]);

//   console.log(...classsDefault, defaultVariant["size"]);
//   return cn(props.default, ...classsDefault);
// };
