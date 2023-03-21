import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import httpRequest from "../../utils/httpRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      httpRequest.get(`/messages/single/${id}`, config).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return httpRequest.post(`/messages`, message, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages {">"} </Link> {currentUser.username}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "Something went to wrong!"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <>
                <div
                  className={
                    m.userId === currentUser._id ? "owner item" : "item"
                  }
                  key={m._id}
                >
                  <img
                    src={
                      (m.userId === currentUser._id && currentUser.img) ||
                      "/images/noavatar.jpg"
                    }
                    alt=""
                  />
                  <p>{m.desc}</p>
                </div>
              </>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a Message" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
