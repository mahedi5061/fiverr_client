import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import "./GigCard.scss";
const GigCard = ({ item }) => {
  const { cover, desc, totalStars, starNumber, price } = item;

  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      httpRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went to wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/images/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{desc}</p>
          <div className="star">
            <img src="./images/star.png" alt="" />
            <span>{Math.round(!isNaN(totalStars / starNumber))}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./images/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
