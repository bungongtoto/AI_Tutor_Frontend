import React from 'react';
import { useGetPapersQuery } from './papersApiSlice';
import { PulseLoader } from "react-spinners";
import Paper from "./Paper";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeadingTile from '../../components/HeadingTile';

const PapersList = () => {
    const {
        data: papers,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetPapersQuery("papersList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      });
      
      const navigate = useNavigate();
    
      const onAddPaperClicked = () => {
        navigate("/dash/admin/papers/new");
      }
    
      let content;
    
      if (isLoading) content = <PulseLoader color={"blue"} />;
    
      if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
      }
    
      if (isSuccess) {
        const { ids } = papers;
    
        const tableContent =
          ids?.length && ids.map((paperId) => <Paper key={paperId} paperId={paperId} />);
    
        content = (
          <table className="table_papers ">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th user__username">
                  Year
                </th>
                <th scope="col" className="table__th user__username">
                  Course Title
                </th>
                <th scope="col" className="table__th user__edit">
                  Actions
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
            <HeadingTile title={"Papers Management"} />
            <div className="top_buttons_container">
              <button onClick={onAddPaperClicked}>
                <IoMdAddCircleOutline className="icon" />
              </button>
            </div>
            {content}
          </div>
        </>
      );
}

export default PapersList