import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { IoMdTrash, IoIosSave } from "react-icons/io";
import { ROLES } from "../../config/roles";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const EditUserForm = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setEmail("");
      setPassword("");
      setRoles([]);
      enqueueSnackbar("Seccessfull!", { variant: "success" });
      navigate("/dash/admin/users");
    }
  }, [isSuccess, isDelSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError || isDelError) {
      enqueueSnackbar("An Error Occured!", { variant: "error" });
    }
  }, [isDelError, isError, enqueueSnackbar]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, email, password, roles, active });
    } else {
      await updateUser({ id: user.id, email, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave = [roles.length].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <IoIosSave />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <IoMdTrash />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className={`form__input big_input`}
          placeholder="Enter your Email"
          id="username"
          name="username"
          type="email"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
          required
        />

        <label className="form__label" htmlFor="password">
          Password:
        </label>
        <input
          className={`form__input big_input `}
          placeholder="....."
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
          required
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
            required
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select big_input ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
          required
        >
          {options}
        </select>
      </form>
    </>
  );

  return (
    <div className="content_container">
      {isLoading ? <PulseLoader color="blue" /> : content}
    </div>
  );
};
export default EditUserForm;
