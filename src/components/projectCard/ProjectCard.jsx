import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";
const ProjectCard = ({ item }) => {
  const { img, pp, cat, username } = item;
  return (
    <Link to="/" className="link">
      <div className="projectCard">
        <img src={img} alt="" />
        <div className="info">
          <img src={pp} alt="" />
          <div className="texts">
            <h2>{cat}</h2>
            <span>{username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
