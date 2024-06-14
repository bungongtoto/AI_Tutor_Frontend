import React from 'react';
import { useNavigate } from "react-router-dom";
import { useGetPapersQuery } from './papersApiSlice';
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";

const Paper = ({paperId}) => {
    const { paper } = useGetPapersQuery("papersList", {
        selectFromResult: ({ data }) => ({
          paper: data?.entities[paperId],
        }),
      });
    
      const navigate = useNavigate();
    
      if (paper) {
        const handleEdit = () => navigate(`/dash/admin/papers/${paperId}`);
    
        return (
          <tr className="table__row user">
            <td className={`table__cell `}>{paper.year}</td>
            <td className={`table__cell `}>{paper.coursetitle}</td>
            <td className={`table__cell `}>
              <button className="icon-button table__button" onClick={handleEdit}>
                <IoMdCreate />
              </button>
            </td>
          </tr>
        );
      } else return null;
    };
    
    const memoizedPaper = memo(Paper);
    
    export default memoizedPaper;