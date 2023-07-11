import { SortDirection } from "../enums/sort-direction.enum";
import { Item } from "../types/item.type";
import { SelectedSort } from "../types/selected-sort.type";
import { Sorts } from "../types/sorts.type";
import { TableKeys } from "../types/table-keys.type";
import classes from "../table.module.scss";
import Icon from "../../Icon/Icon";
import { Icons } from "../../../enums/icons.enum";

type PrivateProps<T extends Item> = {
  keys: TableKeys<T>;
  sorts: Sorts<T>;
  selectedSort: SelectedSort<T> | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<SelectedSort<T> | null>>;
};

function TableHeader<T extends Item>({
  keys,
  sorts,
  selectedSort,
  setSelectedSort,
}: PrivateProps<T>) {
  const onChooseSort = (key: keyof T, direction: SortDirection) => {
    setSelectedSort((prev) => {
      if (prev?.key === key && prev.direction === direction) return null;
      return {
        key,
        direction,
      };
    });
  };

  return (
    <thead>
      <tr>
        {Object.keys(keys).map((key, index) => {
          return (
            <th key={key}>
              <div className={classes["th-inner"]}>
                {keys[key as keyof T]}
                {sorts[key as keyof T] && (
                  <div className={classes["sort-container"]}>
                    <button
                      className={
                        selectedSort &&
                        selectedSort.key === key &&
                        selectedSort.direction === SortDirection.Ascending
                          ? classes["selected-sort"]
                          : ""
                      }
                      onClick={() =>
                        onChooseSort(key as keyof T, SortDirection.Ascending)
                      }
                    >
                      <Icon icon={Icons.AngleUp} />
                    </button>
                    <button
                      className={
                        selectedSort &&
                        selectedSort.key === key &&
                        selectedSort.direction === SortDirection.Descending
                          ? classes["selected-sort"]
                          : ""
                      }
                      onClick={() =>
                        onChooseSort(key as keyof T, SortDirection.Descending)
                      }
                    >
                      <Icon icon={Icons.AngleDown} />
                    </button>
                  </div>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
