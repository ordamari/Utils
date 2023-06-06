import Table from "@/components/Table/Table";
import users from "@/jsons/users.json";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};
function Home() {
  return (
    <div className="home">
      <Table<User>
        data={users}
        keys={{
          id: "ID",
          firstName: "First Name",
          lastName: "Last Name",
        }}
      />
    </div>
  );
}
export default Home;
