import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOutForm from "../../components/checkOutForm/CheckOutForm";
import { getCookie } from "../../utils/cookies";
import httpRequest from "../../utils/httpRequest";
import "./Pay.scss";

const stripePromise = loadStripe(
  "pk_test_51IeCGeC8AvDso05GV3C0XOjeZAk3g9TFOO04AtQzFsVmRBSLuJtVHDHDctf4nDNZgoUxQsofjFZeAOnKFEsfOMSy00dbCEIeZh"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await httpRequest.post(
          `/orders/create-payment-intent/${id}`,
          config
        );
        setClientSecret(res.data.clientSecret);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
