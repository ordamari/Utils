import { SortDirection } from "../enums/sort-direction.enum";
import { Item } from "./item.type";

export type SelectedSort<T extends Item> = {
  key: keyof T;
  direction: SortDirection;
};
