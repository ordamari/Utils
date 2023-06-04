# Utils

Project that contain reusable:

- Hooks
- Components
- Functions

## Hooks

- useArray
- useToggle
- useTranslation

### useArray

Very easy use hook that help you to manage arrays of items, this hook return much a actions to use on the array such as: clear, add, removeById, updateById etc.

Example of use:

```
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

Simply hook that need allow managing boolean state

Example of use:

```
const [isOpen, toggleIsOpen] = useToggle();
```

The toggle callback can get any item in her arg, if its boolean type its will set the value else is will toggle the previous value.

### useTranslation

Hook that help you to translate all the application text for any language are you need
for this hook you need to manage the languages in intended folder.

In that folder you need create json file for each language you need in the application, after that you need to import all the files to the hook, in this example i d'ont use dynamic language but in real project you need save language in global state that allow to change him

The hook return a function that get string and search for text in language file, if she d'ont find one she will find in the fall back language, if steal d'ont find she return the string that she get.

Example for json:

```
{
    "hello:"Hello"
    "general": {
    "world": "World",
  }
}
```

Example use:

```
import useTranslation from "@/hooks/useTranslation";

function Home() {
  const t = useTranslation();
  return <div className="home">
    <span>{t("hello")}</span>
    <span>{t("general.world")}</span>
  </div>;
}
export default Home;
```
