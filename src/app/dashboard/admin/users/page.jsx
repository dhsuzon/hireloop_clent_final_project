import { getUserList } from "@/lib/api/user";
import UserManagementTableClient from "./UserManagementTableClient";

const AdminUserPage = async () => {
  const data = await getUserList();
  const users = data?.users || [];

  return (
    <main className="">
      <div className="">
        <UserManagementTableClient users={users} />
      </div>
    </main>
  );
};

export default AdminUserPage;
