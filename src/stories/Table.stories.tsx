import Table, { TableProps } from "../components/Table/Table";
import users from "../jsons/users.json";


export default {
    title: "Components/Table",
    component: Table,
    argTypes: {
        numOfRows: { control: { type: "range", min: 1, max: users.length, step: 1, default:1 } },
    }
}

type User = {
    id: number;
    firstName: string;
    lastName: string;
  };

type Args = {
    numOfRows: number;
} & Partial<TableProps<User>>  

const Template = ({numOfRows,...args}:Args) => <Table<User> 
{...args}
data={users.slice(0,numOfRows)}
/>;

export const Default = Template.bind({});

export const Sortable = Template.bind({});
Sortable.args = {
    sorts: {
        firstName: (a, b) => a.localeCompare(b),
        lastName: (a, b) => a.localeCompare(b),
        id: (a, b) => a - b,
    }
} as Args;


export const WithStaticPagination = Template.bind({});
WithStaticPagination.args = {
    staticPaginatorOptions:{
        itemsPerPage: 10
    }
} as Args;

export const WithRelativePagination = Template.bind({});
WithRelativePagination.args = {
    relativePaginatorOptions:{
        handlePageChange: (page) => console.log(page),
        pages: 10,
    }
} as Args;

