import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { contactUs } from "../../../services/api/userRoute";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { mutate: contactSendMutate } = useMutation({
    mutationFn: contactUs,
    onSuccess: (data) => {
      if (data) {
        setSubmitted(true);
      }
    },
  });
  const handleChange = (e) => {
    setErrors("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      contactSendMutate({
        ...formData,
      });
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.email.trim()) {
      errors.email = "Email is required";
    }
    if (!data.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!data.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-semibold font-info text-center text-secondary dark:text-white">
            Contact Us
          </h2>
          {submitted ? (
            <p className="text-green-500 text-center">
              Form submitted successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                  placeholder="Let us know how we can help you"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Leave a comment..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm bg-secondary ml-[40%] font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactForm;
