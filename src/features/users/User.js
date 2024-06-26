import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/admin/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.email}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <IoMdCreate />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User)

export default memoizedUser
