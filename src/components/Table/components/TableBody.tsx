import { Item } from "../types/item.type";
import { TableKeys } from "../types/table-keys.type";
import TableTr from "./TableTr";

type PrivateProps<T extends Item> = {
  data: T[];
  keys: TableKeys<T>;
};

function TableBody<T extends Item>({ data, keys }: PrivateProps<T>) {
  return (
    <tbody>
      {data.map((dataItem, index) => {
        return <TableTr key={dataItem.id} dataItem={dataItem} keys={keys} />;
      })}
    </tbody>
  );
}
export default TableBody;
