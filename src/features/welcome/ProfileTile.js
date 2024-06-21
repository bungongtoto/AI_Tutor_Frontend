import{React, useState} from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const ProfileTile = ({profiles}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const { image, name, position } = profiles[currentIndex];
  
    return (
      <div className="profile-tile">
        <FaArrowLeft className="arrow left-arrow" onClick={handlePrevious} />
        <div className="profile-content">
          <img src={image} alt={name} className="profile-image" />
          <div className="profile-name">{name}</div>
          <div className="profile-position">{position}</div>
        </div>
        <FaArrowRight className="arrow right-arrow" onClick={handleNext} />
      </div>
    );
}

export default ProfileTile