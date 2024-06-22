import React from 'react'
import { useGetExamsQuery } from './examsApiSlice';
import { PulseLoader } from "react-spinners";
import Exam from "./Exam";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeadingTile from '../../components/HeadingTile';

const ExamsList = () => {
  const {
    data: exams,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExamsQuery("examsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  const navigate = useNavigate();

  const onAddExamClicked = () => {
    navigate("/dash/admin/exams/new");
  }

  let content;

  if (isLoading) content = <PulseLoader color={"blue"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = exams;

    const tableContent =
      ids?.length && ids.map((examId) => <Exam key={examId} examId={examId} />);

    content = (
      <table className="table_exam ">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Title
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
        <HeadingTile title={"Exam's Managemnet"} />
        <div className="top_buttons_container">
          <button onClick={onAddExamClicked}>
            <IoMdAddCircleOutline className="icon" />
          </button>
        </div>
        {content}
      </div>
    </>
  );
}

export default ExamsList