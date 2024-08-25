import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IconMail, IconDeviceMobile } from "@tabler/icons-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate the form data
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Send the form data to the server
      await axios.post("/api/contact", formData);

      // Reset the form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!data.name) {
      errors.name = "Please enter your name";
    }
    if (!data.email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.message) {
      errors.message = "Please enter your message";
    }
    return errors;
  };

  return (
    <>
      <div className="w-full h-full backdrop-blur-[2px] my-6">
        <motion.div
          className="grid md:grid-cols-2 items-center overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl max-w-6xl mx-auto bg-white font-[sans-serif]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              Have a specific inquiry or looking to explore new opportunities?
              Our experienced team is ready to engage with you.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mt-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`px-2 py-3 bg-transparent text-gray-300 w-full text-sm border-b ${
                    errors.name ? "border-red-500" : "border-gray-400"
                  } focus:border-primary outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`px-2 py-3 bg-transparent text-gray-300 w-full text-sm border-b ${
                    errors.email ? "border-red-500" : "border-gray-400"
                  } focus:border-primary outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <textarea
                  name="message"
                  placeholder="Write Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`px-2 pt-3 bg-transparent text-gray-300 w-full text-sm border-b ${
                    errors.message ? "border-red-500" : "border-gray-400"
                  } focus:border-primary outline-none`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 tracking-wide text-gray-800 bg-primary hover:bg-secondary"
              >
                <IconMail className="mr-2" />
                Send Message
              </button>
            </form>

            <ul className="mt-4 flex flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2 ">
              <li className="flex items-center text-primary">
                <IconMail />
                <a href="#" className="text-current text-sm ml-3">
                  info@example.com
                </a>
              </li>
              <li className="flex items-center text-primary">
                <IconDeviceMobile />
                <a href="#" className="text-current text-sm ml-3">
                  +158 996 888
                </a>
              </li>
            </ul>
          </div>

          <div className="z-10 relative h-full max-md:min-h-[350px]">
            <iframe
              src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactForm;
