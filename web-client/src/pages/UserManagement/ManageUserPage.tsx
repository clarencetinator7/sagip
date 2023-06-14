import { useEffect, useState } from "react";
import { User } from "../../types/user";
import UserTable from "./UserTable";
import { userColumn } from "./UserColumn";

import moment from "moment";

const ManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [staffUsers, setStaffUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

  // FETCH USERS AT PAGE LOAD
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/account`);
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setStaffUsers(data.filter((user: User) => user.userType != "resident"));
        setIsLoading(false);

        // Count all users
        console.log(`Total users: ${data.length}`);

        // Count all unverified and verified user
        const unverifiedUsers = data.filter(
          (user: User) => user.status === "unverified"
        );
        const verifiedUsers = data.filter(
          (user: User) => user.status === "verified"
        );
        console.log(`Unverified users: ${unverifiedUsers.length}`);
        console.log(`Verified users: ${verifiedUsers.length}`);

        // Count all the users that are created at the last month
        const lastMonth = moment().subtract(1, "month");
        const lastMonthUsers = data.filter((user: User) =>
          moment(user.createdAt).isSameOrAfter(lastMonth)
        );
        console.log(`Last month users: ${lastMonthUsers.length}`);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        // TODO: Get error message
      }
    };
    fetchUsers();
  }, [API_BASE_URL]);

  const loadingElement = <p>Loading...</p>;

  return (
    <>
      <h1>User Management Page</h1>
      {/* <UserTable data={users} /> */}
      <button
        className="border-b-2 px-3 py-1 m-1 rounded-sm text-indigo-500 border-indigo-500"
        onClick={() => setIsStaff(false)}
      >
        All Users
      </button>
      <button
        className="border-b-2 px-3 py-1 m-1 rounded-sm text-indigo-500 border-indigo-500"
        onClick={() => setIsStaff(true)}
      >
        Staff Users
      </button>
      {isLoading ? (
        loadingElement
      ) : (
        <UserTable data={isStaff ? staffUsers : users} column={userColumn} />
      )}
    </>
  );
};

export default ManageUserPage;
