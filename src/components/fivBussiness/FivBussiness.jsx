import React from "react";
import "./FivBussiness.scss";
const FivBussiness = () => {
  return (
    <div className="fivBussiness">
      <div className="container">
        <div className="item">
          <h1>fiverr bussiness</h1>
          <h1>A business solution designed for teams</h1>
          <p>Connect to freelancers with proven business experience</p>
          <div className="title">
            <img src="./images/check.png" alt="" />
            The best for every budget
          </div>

          <div className="title">
            <img src="./images/check.png" alt="" />
            Get matched with the perfect talent by a customer success manager
          </div>

          <div className="title">
            <img src="./images/check.png" alt="" />
            Manage teamwork and boost productivity with one powerful workspace
          </div>
          <button>explore fiverr bussiness</button>
        </div>
        <div className="item">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FivBussiness;
