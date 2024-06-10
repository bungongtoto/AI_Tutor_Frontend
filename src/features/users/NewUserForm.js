import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { ROLES } from "../../config/roles";
import PasswordStrengthBar from "react-password-strength-bar";
import { PulseLoader } from "react-spinners";

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["User"]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setRoles([]);
      navigate("/dash/admin/users");
    }
  }, [isSuccess, navigate]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave = [roles.length].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ email, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <div className="content_container create_form">
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <IoIosSave />
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
        <PasswordStrengthBar password={password} />

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
    </div>
  );

  return <>{isLoading ? <PulseLoader color="blue" /> : content}</>;
};

export default NewUserForm;
