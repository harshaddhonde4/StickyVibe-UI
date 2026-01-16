import React, { useRef, useEffect } from "react";
import {
  Form,
  useNavigation,
  useActionData,
  useSubmit,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

function Contact() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  // Show toast notifications based on actionData
  useEffect(() => {
    if (actionData?.success) {
      toast.success("Thank you for contacting us! We'll get back to you soon.");
      if (formRef.current) {
        formRef.current.reset();
      }
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the contact form?"
    );
    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "POST" });
    } else {
      toast.info("Form submission cancelled.");
    }
    // If user cancels, do nothing
  };

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Contact Us" />

        <Form
          method="POST"
          ref={formRef}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className={textFieldStyle}
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                className={textFieldStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Phone
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="1234567890"
                pattern="[0-9]{10}"
                className={textFieldStyle}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your message here..."
              className={textFieldStyle}
              required
              minLength={10}
              maxLength={500}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-6 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm hover:bg-dark dark:hover:bg-lighter transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Contact;

export async function contactAction({ request }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("mobileNumber"),
    message: data.get("message"),
  };

  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    return {
      error:
        error.response?.data?.message || "Failed to submit. Please try again.",
    };
  }
}
