import { useEffect, useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import DataTable from "../../../Components/Common/DataTable/Index";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const Users = await getFB("/Users");

    if (Array.isArray(Users)) {
      setUsers(Users);
    }
  };

  const columns = [
    { name: "Avatar", uid: "avatar", sortable: true },
    { name: "UID", uid: "uid", sortable: true },
    { name: "First Name", uid: "firstName", sortable: true },
    { name: "Last Name", uid: "lastName", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Role", uid: "role", sortable: true },
  ];

  const initialColumns = [
    "avatar",
    "firstName",
    "lastName",
    "email",
    "role",
  ];

  function handleClick(value) {

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          rows={users}
          initialColumns={initialColumns}
          updateParent={handleClick}
        />
      </div>
    </div>
  );
};
