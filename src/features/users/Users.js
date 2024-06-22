import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";
import User from "./User";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeadingTile from "../../components/HeadingTile";

const Users = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  const navigate = useNavigate();

  const onAddUserClicked = () => {
    navigate("/dash/admin/users/new");
  }

  let content;

  if (isLoading) content = <PulseLoader color={"blue"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Email
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return (
    <>
      <div className="content_container">
        <HeadingTile title={"User Management"} />
        <div className="top_buttons_container">
          <button title="Add User" onClick={onAddUserClicked}>
            <IoMdPersonAdd className="icon" />
          </button>
        </div>
        {content}
      </div>
    </>
  );
};

export default Users;
