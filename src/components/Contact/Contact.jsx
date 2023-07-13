import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
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
    console.log("query", query);
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
      setErrors({});

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
    <>
      <h1 className="text-4xl font-bold text-center mt-10">Contact Us</h1>
      <div className="flex justify-center mt-10">
        <div className="w-8/12 p-6 bg-gray-200 rounded border border-gray-300">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-8">
              <div className="w-full md:w-1/2">
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                {errors.name && (
                  <span className="text-orange">{errors.name}</span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="mobile" className="block mb-2">
                  Mobile Number
                </label>
                <div className="flex">
                  <input
                    id="countryPin"
                    className="w-1/5 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    value="+ 91"
                    readOnly
                  />
                  <input
                    type="number"
                    id="mobileNumber"
                    className="w-4/5 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                  />
                </div>
                {errors.mobile && (
                  <span className="text-orange">{errors.mobile}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap mb-8">
              <div className="w-full md:w-1/2">
                <label htmlFor="email" className="block mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email ID "
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                {errors.email && (
                  <span className="text-orange">{errors.email}</span>
                )}
              </div>
              <div className="w-full md:w-1/2">
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
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                {errors.subject && (
                  <span className="text-orange">{errors.subject}</span>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="description" className="block mb-2">
                Describe your requirements :
              </label>
              <textarea
                id="description"
                rows="5"
                placeholder="Describe your requirement"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
              {errors.description && (
                <span className="text-orange">{errors.description}</span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange py-2 px-6 text-white rounded-md duration-500"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
