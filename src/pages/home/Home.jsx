import React from "react";
import CatCard from "../../components/catCard/catCard";
import Featured from "../../components/featured/Featured";
import FivBussiness from "../../components/fivBussiness/FivBussiness";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Slide from "../../components/slide/Slide";
import Support from "../../components/support/Support";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import { cards, projects } from "../../data";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <Support />
      <FivBussiness />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
