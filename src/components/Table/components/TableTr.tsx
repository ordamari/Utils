import { Item } from "../types/item.type";
import { TableKeys } from "../types/table-keys.type";

type PrivateProps<T extends Item> = {
  dataItem: T;
  keys: TableKeys<T>;
};

function TableTr<T extends Item>({ dataItem, keys }: PrivateProps<T>) {
  return (
    <tr>
      {Object.keys(keys).map((key, index) => {
        return <td key={key}>{dataItem[key as keyof T]}</td>;
      })}
    </tr>
  );
}
export default TableTr;
