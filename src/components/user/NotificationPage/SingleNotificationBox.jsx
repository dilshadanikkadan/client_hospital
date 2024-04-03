import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getAllNotification,
  makePayment,
  validateMakePayment,
} from "../../../services/api/userRoute";
import { useNavigate, useParams } from "react-router-dom";
import { useIdUser } from "../../../store/others/BlockedUserCheck";

const SingleNotificationBox = () => {
  const navigate = useNavigate();
  // const [orderId, setOrderId] = useState(null)

  const iduser = useIdUser();
  const { id } = useParams();
  const { data: allNotification } = useQuery({
    queryKey: ["nitification", id],
    queryFn: getAllNotification,
  });

  // console.log(allNotification);

  const downloadImage = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = allNotification?.invoice;
    downloadLink.download = "image.jpg";
    window.open(allNotification?.invoice);
  };

  const { mutate: makePaymentMutate } = useMutation({
    mutationFn: makePayment,
    onSuccess: (data) => {
      console.log(data);

      handleMakePayment(data.id);
    },
  });
  const { mutate: validateMakePaymentMutate } = useMutation({
    mutationFn: validateMakePayment,
    onSuccess: (data) => {
      console.log(data);
      navigate("/payment/sucess", { replace: true });
    },
  });

  const handleClick = () => {
    makePaymentMutate({
      amount: 20000 * 100,
      currency: "INR",
      receipt: allNotification?.recieverId,
    });
  };

  const handleMakePayment = (orderId) => {
    console.log(parseInt(allNotification?.payment));
    const amount = parseInt(allNotification?.payment) * 1000;
    const currency = "INR";

    var options = {
      key: "rzp_test_y12CU0IJofELhC",
      currency,
      // "amount":1400,
      name: "E-care",
      description: "Approval payment",
      order_id: orderId,
      handler: function (response) {
        const body = {
          ...response,
          userId: iduser,
        };
        console.log(response);
        console.log("Amount:", options.amount);
        validateMakePaymentMutate(body);
      },
      prefill: {
        name: "dilshad",
        email: "dilshadanikkadan3312@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log("payment failed");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <>
      <div className="container mx-auto mt-10 px-10">
        <div
          id="alert-additional-content-5"
          className="p-6 shadow-md border border-gray-300 rounded-lg bg-white dark:border-gray-600 dark:bg-gray-800"
          role="alert"
        >
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              Approval Message
            </h3>
          </div>
          <div className="my-6 ml-10   text-gray-800 dark:text-gray-300 text-lg leading-loose">
            <p className="font-semibold">Hi ,{allNotification?.name}</p>
            <p>{allNotification?.message}</p>
            <p className="mt-5">
              As part of the next steps, kindly proceed with the payment process
              for the services you'll be providing. Below are the details for
              your convenience
            </p>
            <div classname="mt-5 mb-3">
              <p className="mt-4 mb-4">
                {" "}
                Payment Amount: ₹
                <span className="font-semibold">
                  {allNotification?.payment}
                </span>
              </p>
            </div>
            <p>
              Please ensure that the payment is completed within the specified
              deadline to initiate the necessary procedures smoothly.
            </p>
            <p classname="mt-3">Best regards,</p>
            <div classname="mt-3">
              <p className="mt-4"> James</p>
              <p>{allNotification?.companyName}</p>
              <p>{allNotification?.Postion}</p>
            </div>
          </div>
          <div className="flex justify-center gap-10">
            <button
              onClick={downloadImage}
              type="button"
              className="bg-secondary text-white py-2  px-3 rounded-md"
              data-dismiss-target="#alert-additional-content-5"
              aria-label="Close"
            >
              Download Invoice
            </button>

            <button
              onClick={handleClick}
              className="bg-secondary text-white py-2 rounded-md px-3"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNotificationBox;
