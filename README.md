# Utils

Project that contain reusable:

- [Hooks](#hooks)
- [Components](#components)
- Functions

## Hooks

- [useArray](#usearray)
- useToggle
- useTranslation

### useArray

Very easy use hook that help you to manage arrays of items, this hook return much a actions to use on the array such as: clear, add, removeById, updateById etc.

Example of use:

```typescript
const [users, userActions] = useArray<User>();
```

All actions to use:

- clear - that clean the array.
- add - that add item to array.
- removeById - that remove item by id.
- getById - that return item by id, if not found return undefined.
- replaceById - that replace old item with new one (intended to update all the properties of item).
- updateById - that update item by id (intended to update partial of the properties).
- getSortedByDates - that get the key for date and boolean that represents the direction and return the array sorted by dates.

### useToggle

Simply hook that need allow managing boolean state.

Example of use:

```typescript
const [isOpen, toggleIsOpen] = useToggle();
```

The toggle callback can get any item in her arg, if its boolean type its will set the value else is will toggle the previous value.

### useTranslation

Hook that help you to translate all the application text for any language are you need
for this hook you need to manage the languages in intended folder.

In that folder you need create json file for each language you need in the application, after that you need to import all the files to the hook, in this example i d'ont use dynamic language but in real project you need save language in global state that allow to change him.

The hook return a function that get string and search for text in language file, if she d'ont find one she will find in the fall back language, if steal d'ont find she return the string that she get.

Example for json:

```json
{
  "hello": "Hello",
  "general": {
    "world": "World"
  }
}
```

Example use:

```typescript
import useTranslation from "@/hooks/useTranslation";

function Home() {
  const t = useTranslation();
  return (
    <div className="home">
      <span>{t("hello")}</span>
      <span>{t("general.world")}</span>
    </div>
  );
}
export default Home;
```

## Components

- InfinityScroll
- Icon
- Paginator
- ReadMoreLess
- Table

### InfinityScroll

Wrapper component that allow you easily embed infinity scroll.

Except from children the components must get:

- isHasMore - boolean variable that announce to component when d'ont have more items to load
- load - callback function to load more items

The component can also get:

- loader - that replace the default one, the loader show when we wait to callback.
- errorComponent - that replace the default one, when have a error the error component watch and the InfinityScroll component stop load the data, when the user click on the error component the component try to load data again.

Code example:

```typescript
import InfinityScroll from "@/components/InfinityScroll/InfinityScroll";
import useArray from "@/hooks/useArray";
import { useToggle } from "@/hooks/useToggle";
import { useCallback, useState } from "react";
import User from "./User";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

function Users() {
  const [users, usersActions] = useArray<User>([]);
  const [page, setPage] = useState(0);
  const [isHasMore, toggleIsHasMore] = useToggle(true);

  const fetchUsers = useCallback(async () => {
    const newUsers = await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        return res.data as User[];
      });
    if (newUsers.length === 0) {
      toggleIsHasMore();
    }
    usersActions.addMultiple(newUsers);
    setPage((prev) => prev + 1);
  }, [page]);

  return (
    <InfinityScroll isHasMore={isHasMore} load={fetchUsers}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </InfinityScroll>
  );
}
export default Users;
```

### Icon

Useful component that allow you to use all your svgs from one file.

Simply use:

```typescript
<Icon icon={Icons.AngleDown} />
```

For use this component you need download svgr package and change the configuration for use that, for any Icon you add you need add key to Icons enum to target him.

### Paginator

Unstyle paginator component for manage pages.

![Paginator image](https://res.cloudinary.com/dif8yy3on/image/upload/v1685988219/gdzhmdklxmfstsqf78r1.jpg)

Props:

|        Prop         | Is require |     Type      | Default value |             Description             |
| :-----------------: | :--------: | :-----------: | :-----------: | :---------------------------------: |
|        pages        |    true    |    number     |       -       |           Amount of pages           |
|        page         |    true    |    number     |       -       |          The current page           |
|  handlePageChange   |    true    | (page)=> void |       -       | Callback function when page clicked |
|      className      |   false    |    string     |      ""       |     className for the paginator     |
| pageButtonClassName |   false    |    string     |      ""       |    className for the page button    |

### ReadMoreLess

Unstyle component for long text that you need the option to toggle between show more and less, the text will cut in the last space between min and max character in the short version, if d'ont find one that will use the max character, if d'ont have more character that max the component d'ont do nothing.

|        Prop        | Is require |               Type               | Default value |                      Description                      |
| :----------------: | :--------: | :------------------------------: | :-----------: | :---------------------------------------------------: |
|      children      |    true    |              string              |       -       |                     The long text                     |
|        max         |    true    |              number              |       -       | Maximum character that will shown in the less version |
|     sideEffect     |   false    | (isShowFullText: boolean)=> void |    ()=>{}     | Side effect that can add when toggle between versions |
|     className      |   false    |              string              |      ""       |           ClassName for style the container           |
|       style        |   false    |       React.CSSProperties        |      {}       |      Style object for inline style the container      |
| highlightClassName |   false    |              string              |      ""       |            ClassName for the toggle button            |
|   highlightStyle   |   false    |       React.CSSProperties        |      {}       |    Style object for inline style the toggle button    |

Example use:

```typescript
<ReadMoreLess max={100} min={50}>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, corporis!
  Deserunt, debitis! Dicta eos nesciunt ipsa error numquam distinctio obcaecati?
  Eos voluptatibus sint quos dolorem nihil possimus nam, blanditiis ex!
</ReadMoreLess>
```

Short:

![Short image](https://res.cloudinary.com/dif8yy3on/image/upload/v1686028897/xmup3eeevcxzkqfjd8wt.jpg)

Long:

![Long image](https://res.cloudinary.com/dif8yy3on/image/upload/v1686028897/xxsas29lhvjcn66hrmcn.jpg)

### Table

Unstyle component for creating table from array of items, for each item you can decide which keys to show in the table and witch title he have, also you can add sort by any key and give to key the function hey need for for sorting, table item must contain id

Props:

|           Prop           | Is require |                               Type                                |       Default value       |                         Description                         |
| :----------------------: | :--------: | :---------------------------------------------------------------: | :-----------------------: | :---------------------------------------------------------: |
|           data           |    true    |                                T[]                                |             -             |                Array of items for the table                 |
|           keys           |   false    |                {[K in keyof Partial<T>]: string;}                 | {[key as keyof T]:string} |   For each key you want in the table, witch title to show   |
|          sorts           |   false    | {[K in keyof Partial<T>]: (first: T[K], second: T[K]) => number;} |            {}             | For each key you want sort by him, function for sorting him |
|  staticPaginatorOptions  |   false    |                          Specified later                          |         undefined         |                       Specified later                       |
| relativePaginatorOptions |   false    |                          Specified later                          |         undefined         |                       Specified later                       |

export type StaticPaginatorOptions = {
itemsPerPage: number;
page?: number;
handlePageChange?: (page: number) => void;
className?: string;
pageButtonClassName?: string;
};

staticPaginatorOptions:

Add this for paginator between existing data

|       Prop       | Is require |                Type                 | Default value |                                           Description                                            |
| :--------------: | :--------: | :---------------------------------: | :-----------: | :----------------------------------------------------------------------------------------------: |
|   itemsPerPage   |    true    |               number                |       -       |                                 How much items you want in page                                  |
|       page       |   false    |         number or undefined         |       -       | this variable intended to control the page from outside, if you d'ont need that you can skep him |
| handlePageChange |   false    | (page: number) => void or undefined |       -       | this variable intended to control the page from outside, if you d'ont need that you can skep him |
|    ClassName     |   false    | (page: number) => void or undefined |       -       | this variable intended to control the page from outside, if you d'ont need that you can skep him |

Example use:

```typescript
<Table<User>
  data={users}
  keys={{
    id: "ID",
    firstName: "First Name",
    lastName: "Last Name",
  }}
/>
```
