import { Item } from "./item.type";

export type TableKeys<T extends Item> = {
  [K in keyof Partial<T>]: string;
};
