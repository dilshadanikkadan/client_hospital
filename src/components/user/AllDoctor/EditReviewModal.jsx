import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateReview } from "../../../services/api/userRoute";

const EditReviewModal = ({
  setIsOpenEdit,
  ratingNum,
  reviewId,
  reviewTextUPdating,
}) => {
  console.log(reviewId);
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState(reviewTextUPdating);
  const queryClient = useQueryClient();
  const { mutate: reviewUpdateMutate } = useMutation({
    mutationFn: updateReview,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["reviews"]);
      }
    },
  });
  const handleUpdate = () => {
    reviewUpdateMutate({
      reviewId,
      rating,
      reviewText,
    });
    setIsOpenEdit(false);
  };
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto" id="reviewModal">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="bg-gray-800 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Review Doctor
                </h3>
                <button
                  className="text-gray-300 hover:text-gray-400 focus:outline-none"
                  onClick={() => setIsOpenEdit(false)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal Body */}
            <div className="p-4">
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating:
                  </label>
                  <div className="rating">
                    <input
                      type="radio"
                      id="1"
                      onClick={(e) => setRating(e.target.id)}
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      id="2"
                      onClick={(e) => setRating(e.target.id)}
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      id="3"
                      onClick={(e) => setRating(e.target.id)}
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      id="4"
                      onClick={(e) => setRating(e.target.id)}
                      name="rating-1"
                      className="mask mask-star"
                    />
                    <input
                      type="radio"
                      id="5"
                      onClick={(e) => setRating(e.target.id)}
                      name="rating-1"
                      className="mask mask-star"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review:
                  </label>
                  <textarea
                    value={reviewText}
                    id="review"
                    name="review"
                    rows={3}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    defaultValue={""}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {/* Modal Footer */}
            <div className="bg-gray-100 px-4 py-3 text-right">
              <button
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                onClick={handleUpdate}
              >
                updated
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
