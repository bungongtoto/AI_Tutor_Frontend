import React from 'react';
import { useNavigate } from "react-router-dom";
import { useGetPapersQuery } from './papersApiSlice';
import { memo } from "react";
import { IoMdCreate , IoMdAddCircleOutline} from "react-icons/io";

const Paper = ({paperId}) => {
    const { paper } = useGetPapersQuery("papersList", {
        selectFromResult: ({ data }) => ({
          paper: data?.entities[paperId],
        }),
      });
    
      const navigate = useNavigate();
    
      if (paper) {
        const handleEdit = () => navigate(`/dash/admin/papers/${paperId}`);
        const handleAddQuestion = () => navigate(`/dash/admin/questions/new/${paperId}`);
    
        return (
          <tr className="table__row user">
            <td className={`table__cell `}>{paper.year}</td>
            <td className={`table__cell `}>{paper.coursetitle}</td>
            <td className={`table__cell cell__action `}>
              <button title='Edit Paper' className="icon-button table__button" onClick={handleEdit}>
                <IoMdCreate />
              </button>
              <button title='Add Question' className="icon-button table__button" onClick={handleAddQuestion}>
                <IoMdAddCircleOutline />
              </button>
            </td>
          </tr>
        );
      } else return null;
    };
    
    const memoizedPaper = memo(Paper);
    
    export default memoizedPaper;