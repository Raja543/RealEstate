import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, set } from "firebase/database";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { AreaChart, Building2, MapPin } from "lucide-react";
import { IndianRupee } from "lucide-react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
  });

  const addProperty = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const newPropertyRef = push(propertiesRef);
      await set(newPropertyRef, {
        location: newProperty.location,
        priceRange: newProperty.priceRange,
        propertyType: newProperty.propertyType,
        bedrooms: newProperty.bedrooms,
      });

      setNewProperty({
        location: "",
        priceRange: "",
        propertyType: "",
        bedrooms: "",
      });

      console.log("Property data stored successfully!");
    } catch (error) {
      console.log("Error storing property data:", error);
    }
  };

  const handleChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const db = getDatabase();
        const propertiesRef = ref(db, "properties");
        const snapshot = await get(propertiesRef);
        const propertyData = [];
        snapshot.forEach((childSnapshot) => {
          propertyData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setProperties(propertyData);
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };

    fetchProperties()
      .then(() => {
        console.log("Property fetch successful!");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async (property) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:3000/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ property }), // Send the property object to the backend
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_36kqmf68BF7orC",
      currency: "INR",
      amount: `${property.price} ` * 100,
      order_id: data.id,
      name: "Dwelling Real estate",
      description: "Thank you for nothing. Please give us some money",
      image: "/images/favicon.ico",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successful");
      },
      prefill: {
        name: "Raja Kumar",
        email: "razakumarmahto952@gmail.com",
        contact: "7903765195",
      },
      notes: {
        address: "Dwelling Real estate",
      },
      theme: {
        color: "#FFFAE9",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-screen ">
        <div className="w-80 overflow-hidden sticky top-0 left-0 h-[90vh] ">
          <form onSubmit={addProperty}>
            <div className="mb-4">
              <label htmlFor="location" className="block mb-1">
                Location:
              </label>
              <input
                type="text"
                id="location"
                value={newProperty.location}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priceRange" className="block mb-1">
                Price Range:
              </label>
              <select
                id="priceRange"
                value={newProperty.priceRange}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded"
              >
                <option value="">Any</option>
                <option value="0-100000">$0 - $100,000</option>
                <option value="100000-200000">$100,000 - $200,000</option>
                <option value="200000-300000">$200,000 - $300,000</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="propertyType" className="block mb-1">
                Property Type:
              </label>
              <select
                id="propertyType"
                value={newProperty.propertyType}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded"
              >
                <option value="">Any</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="bedrooms" className="block mb-1">
                Bedrooms:
              </label>
              <select
                id="bedrooms"
                value={newProperty.bedrooms}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={addProperty}
              className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600"
            >
              addProperty
            </button>
          </form>
        </div>
        <div className=" overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-12 ml-12 my-2 p-4  ">
          <h1 className="text-4xl font-bold text-center col-span-3">
            Listed Properties
          </h1>
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer "
            >
              <div
                className="bg-cover bg-center h-56 p-4"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)",
                }}
              ></div>
              <div className="p-4">
                <p className="Capitalize  text-left text-2xl font-extrabold py-2">
                  {property.housename}
                </p>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-lg flex flex-row ">
                    <IndianRupee /> {property.price}
                  </div>
                  <div className=" text-lg flex flex-row ">
                    <AreaChart /> {property.area} sqft
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between my-2">
                  <div className="text-lg flex flex-row">
                    <MapPin /> {property.location}
                  </div>
                  <div className="text-lg flex flex-row">
                    <Building2 /> {property.propertyType}
                  </div>
                </div>
                <div className="">
                  <button
                    className="bg-orange  text-[#fff] font-bold py-2 px-4 rounded-lg mx-auto"
                    onClick={() => displayRazorpay(property)} // Pass the property to the function
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
