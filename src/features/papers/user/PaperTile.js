import React from 'react';
import { IoIosBook } from 'react-icons/io';
import { useGetPapersQuery } from '../papersApiSlice';
import { useNavigate } from 'react-router-dom';

const PaperTile = ({paperId}) => {
    const navigate = useNavigate();
    const { paper } = useGetPapersQuery("papersList", {
        selectFromResult: ({ data }) => ({
          paper: data?.entities[paperId],
        }),
      });

    const onLearnClicked = () => {
        if (paper) {
            navigate(`/dash/mycourses/questions/${paper.id}`);
        }
    }
    return (
        <div className="paper_tile">
          <div className="icon-wrapper">
            <IoIosBook />
          </div>
          <div className="content-wrapper">
            {paper && <h2 className="paper_tile_title">{paper.year}</h2>}
            <button className="learn-button" onClick={onLearnClicked}>Start Learning</button>
          </div>
        </div>
      );
}

export default PaperTile