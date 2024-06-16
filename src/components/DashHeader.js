import React from "react";
import { IoIosExit } from "react-icons/io";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const DashHeader = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();
  const onLogoutClicked = async () => {
    await sendLogout().unwrap();
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/");
  };

  const errClass = isError ? "errmsg" : "offscreen";

  return (
    <header className="dash_header">
    {isError ? <p className={errClass}>{error?.data?.message}</p> && enqueueSnackbar("Logout errro", { variant: "error" }) : <></>}
    <p>Dash Header</p>
      {isLoading ? (
        <PulseLoader color={"blue"} />
      ) : (
       
          <button className="logout-button" onClick={onLogoutClicked}> Logout
            <IoIosExit />
          </button>
      )}
    </header>
  );
};

export default DashHeader;
