import React from "react";
import { columns } from "@/components/Users_Table/columns";
import { usersData } from "@/components/Users_Table/data";
import { DataTable } from "@/components/Users_Table/data-table";

const Users = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-4">User Management</h1>
        <p className="text-sm text-muted-foreground mt-2 mx-4">
          Manage your users and their account permissions.
        </p>
      </div>
      {/* TABLE */}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={usersData} />
      </div>
    </>
  );
};

export default Users;
