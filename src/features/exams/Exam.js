import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetExamsQuery } from "./examsApiSlice";
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";

const Exam = ({ examId }) => {
  const { exam } = useGetExamsQuery("examsList", {
    selectFromResult: ({ data }) => ({
      exam: data?.entities[examId],
    }),
  });

  const navigate = useNavigate();

  if (exam) {
    const handleEdit = () => navigate(`/dash/admin/exams/${examId}`);

    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{exam.title}</td>
        <td className={`table__cell `}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <IoMdCreate />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedExam = memo(Exam);

export default memoizedExam;
