import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import dayjs from "dayjs";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const getMonthName = (monthNum: number, format: string) => {
  return dayjs().month(monthNum).format(format);
};
