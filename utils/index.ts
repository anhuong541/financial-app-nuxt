import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import dayjs from "dayjs";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const getMonthName = (monthNum: number, format: string) => {
  return dayjs().month(monthNum).format(format);
};

export const toKebabCase = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const firebastDataFormat = (date: Date) => {
  const format = "MMMM D, YYYY [at] h:mm:ss A [UTC]Z";
  return dayjs(date).format(format);
};

export const getDateKey = (year: number, month: number): string => {
  const result = `${year}-${getMonthName(month, "MMM")}`;
  return result;
};
