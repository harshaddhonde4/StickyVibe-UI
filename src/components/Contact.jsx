import React, { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";
import apiClient from "../api/apiClient";

export default function Contact() {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?",
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  const labelStyle =
    "block text-base font-semibold text-primary dark:text-light mb-2";
  const inputStyle =
    "w-full px-4 py-3 text-base border rounded-lg transition-all border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-light focus:border-transparent outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center gap-1";

  return (
    <div className="min-h-screen bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <PageTitle title="Contact Us" />

        {/* Intro Text */}
        <p className="max-w-3xl mx-auto mt-6 text-gray-600 dark:text-gray-300 text-center text-lg leading-relaxed">
          We'd love to hear from you! If you have any questions, feedback, or
          suggestions, please don't hesitate to reach out.
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-12">
          {/* Left: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-light mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out through any of the following channels. We
                typically respond within 24-48 hours.
              </p>
            </div>

            {/* Contact Cards */}
            {contactInfo && (
              <div className="space-y-4">
                {/* Phone */}
                {contactInfo.phone && (
                  <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-light/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary dark:text-light mb-1">
                        Phone
                      </h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-light transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contactInfo.email && (
                  <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-light/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary dark:text-light mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-light transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {contactInfo.address && (
                  <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-light/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary dark:text-light mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}

                {/* Business Hours */}
                {contactInfo.businessHours && (
                  <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-light/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary dark:text-light mb-1">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {contactInfo.businessHours}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Why Contact Us */}
            <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-light/5 dark:to-light/10 rounded-xl">
              <h3 className="text-xl font-semibold text-primary dark:text-light mb-4">
                Why Contact Us?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary dark:text-light mt-1">✓</span>
                  <span>Quick response within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary dark:text-light mt-1">✓</span>
                  <span>Expert customer support team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary dark:text-light mt-1">✓</span>
                  <span>Dedicated to solving your queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary dark:text-light mt-1">✓</span>
                  <span>Multiple contact channels available</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary dark:text-light mb-6">
              Send us a Message
            </h2>

            <Form
              method="POST"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={labelStyle}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={inputStyle}
                  required
                  minLength={3}
                  maxLength={50}
                  autoComplete="name"
                />
                {actionData?.errors?.name && (
                  <p className={errorStyle}>
                    <span>⚠️</span> {actionData.errors.name}
                  </p>
                )}
              </div>

              {/* Email and Mobile Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className={labelStyle}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={inputStyle}
                    required
                    autoComplete="email"
                  />
                  {actionData?.errors?.email && (
                    <p className={errorStyle}>
                      <span>⚠️</span> {actionData.errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Field */}
                <div>
                  <label htmlFor="mobileNumber" className={labelStyle}>
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    pattern="^\d{10}$"
                    title="Mobile number must be exactly 10 digits"
                    placeholder="1234567890"
                    className={inputStyle}
                    autoComplete="tel"
                  />
                  {actionData?.errors?.mobileNumber && (
                    <p className={errorStyle}>
                      <span>⚠️</span> {actionData.errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={labelStyle}>
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className={inputStyle}
                  required
                  minLength={10}
                  maxLength={500}
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  {actionData?.errors?.message && (
                    <p className={errorStyle}>
                      <span>⚠️</span> {actionData.errors.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                    Max 500 characters
                  </p>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Privacy Notice:</span> Your
                  information is secure and will only be used to respond to your
                  inquiry.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-white dark:text-black text-lg font-semibold rounded-lg transition-all duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <span>→</span>
                  </span>
                )}
              </button>
            </Form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-primary dark:text-light mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md group">
              <summary className="font-semibold text-primary dark:text-light cursor-pointer flex items-center justify-between">
                <span>How long does it take to receive a response?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 pl-2">
                We typically respond within 24-48 hours during business days.
                For urgent matters, please call us directly.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md group">
              <summary className="font-semibold text-primary dark:text-light cursor-pointer flex items-center justify-between">
                <span>Can I track my order through this form?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 pl-2">
                For order tracking, please use the "My Orders" section in your
                account dashboard for real-time updates.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md group">
              <summary className="font-semibold text-primary dark:text-light cursor-pointer flex items-center justify-between">
                <span>Do you offer phone support?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 pl-2">
                Yes! Call us during business hours for immediate assistance. Our
                support team is ready to help you.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md group">
              <summary className="font-semibold text-primary dark:text-light cursor-pointer flex items-center justify-between">
                <span>What information should I include in my message?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 pl-2">
                Please include relevant details such as order numbers, product
                names, or specific issues you're experiencing to help us assist
                you better.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function contactAction({ request }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };

  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    if (error.response?.status === 401) {
      return {
        success: false,
        error: "Please log in to submit a contact form.",
      };
    }
    return {
      success: false,
      error:
        error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
    };
  }
}

export async function contactLoader() {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    console.error("Failed to load contact info:", error);
    // Return fallback data
    return {
      phone: "+1 (555) 123-4567",
      email: "support@eazystore.com",
      address: "123 Business Street, Suite 100, City, State 12345",
      businessHours: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    };
  }
}
