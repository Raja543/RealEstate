import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    description: "",
  });

  useEffect(() => {
    if (query.get("Subject")) {
      setSubject(query.get("Subject"));
    }
  }, []);

  const userCollection = collection(db, "contacts");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function sendEmail() {
    emailjs
      .send(
        "service_8bqc0u8",
        "template_7mwgjrf",
        {
          form_name: name,
          form_email: email,
          form_subject: subject,
          form_message: description,
          form_phone: mobile,
        },
        "WxG2eBWo77ylYjTM4"
      )
      .then(() => {
        console.log("Email sent");
      })
      .catch((e) => {
        console.error("Error while sending email", e);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    console.log("form submitted");
    const updatedErrors = {};

    if (name.trim() === "") {
      updatedErrors.name = "Name is required";
      hasError = true;
    }

    if (mobile.trim() === "") {
      updatedErrors.mobile = "Mobile number is required";
      hasError = true;
    }

    if (email.trim() === "") {
      updatedErrors.email = "Email is required";
      hasError = true;
    }

    if (subject.trim() === "") {
      updatedErrors.subject = "Subject is required";
      hasError = true;
    }

    if (description.trim() === "") {
      updatedErrors.description = "Description is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(updatedErrors);
    } else {
      setErrors({
        subject: "",
        name: "",
        mobile: "",
        description: "",
        email: "",
      });

      const timestamp = new Date();

      const docRef = await addDoc(userCollection, {
        name: name,
        mobile: mobile,
        email: email,
        subject: subject,
        description: description,
        timestamp: timestamp,
      });

      sendEmail();

      console.log("Document written with ID: ", docRef.id);

      setName("");
      setMobile("");
      setEmail("");
      setSubject("");
      setDescription("");

      toast.success("🙏 Thank You, Our Team will contact you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
      <div className="w-full lg:w-2/5 bg-[#e9dfc1] text-[#1a237e] text-base opacity-90 m-10 lg:mx-20 my-6 p-4 rounded-lg ">
        <h1 className="text-4xl text-center ">Get in touch</h1>
        <form className="flex flex-col m-2  ">
          <div className="flex flex-col m-2">
            <label htmlFor="name" className="font-semibold ">
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              placeholder="Enter your name "
              onChange={handleNameChange}
              autoFocus
              className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black] "
              required
            />
            {errors.name && (
              <span className="text-[#e16b35]">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleEmailChange}
              autoFocus
              className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
              required
            />
            {errors.email && (
              <span className="text-[#e16b35]">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="mobile" className="block mb-2">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobileNumber"
              className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={handleMobileChange}
              required
            />
            {errors.mobile && (
              <span className="text-[#e16b35]">{errors.mobile}</span>
            )}
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              autoComplete="off"
              placeholder="Enter subject"
              value={subject}
              onChange={handleSubjectChange}
              className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
            />
            {errors.subject && (
              <span className="text-[#e16b35]">{errors.subject}</span>
            )}
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="description" className="block mb-2">
              Describe your requirements :
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Describe your requirement"
              value={description}
              onChange={handleDescriptionChange}
              className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black] resize-none"
            ></textarea>
            {errors.description && (
              <span className="text-[#e16b35]">{errors.description}</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="max-w-fit mx-auto px-4 py-2 text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a] focus:ring-1 focus:ring-[black]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default ContactForm;
