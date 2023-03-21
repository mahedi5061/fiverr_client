import { useQuery } from "@tanstack/react-query";
import React from "react";
import httpRequest from "../../utils/httpRequest";
import "./Review.scss";

const Review = ({ review }) => {
  const userId = review?.userId;

  const { isLoading, error, data } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      httpRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="item">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went to wrong!"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/images/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/images/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>

      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/images/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
      <hr />
    </div>
  );
};

export default Review;
