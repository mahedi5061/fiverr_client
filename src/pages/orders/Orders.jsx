import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import httpRequest from "../../utils/httpRequest";
import "./Orders.scss";
const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      httpRequest.get("/orders", config).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await httpRequest.get(`/conversations/single/${id}`, config);
      console.log(res);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await httpRequest.post(
          `/conversations/`,
          {
            to: currentUser.isSeller ? buyerId : sellerId,
          },
          config
        );
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Sonething went to wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <>
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>
                    {order.price}.<sup>99</sup>
                  </td>
                  <td>13</td>
                  <td>
                    <img
                      className="message"
                      src="./images/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
