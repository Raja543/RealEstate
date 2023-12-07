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
    price: "",
    propertyType: "",
    area: "",
  });
  const [errors, setErrors] = useState({
    location: "",
    price: "",
    propertyType: "",
    area: "",
  });

  const addProperty = async (e) => {
    e.preventDefault();
    let hasError = false;
    const updatedErrors = {};

    if (newProperty.location.trim() === "") {
      updatedErrors.location = "Location is required";
      hasError = true;
    }

    if (newProperty.price.trim() === "") {
      updatedErrors.price = "Price is required";
      hasError = true;
    }

    if (newProperty.propertyType.trim() === "") {
      updatedErrors.propertyType = "Property type is required";
      hasError = true;
    }

    if (newProperty.area.trim() === "") {
      updatedErrors.area = "Area is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(updatedErrors);
    } else {
      setErrors({
        location: "",
        price: "",
        propertyType: "",
        area: "",
      });
    }

    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const newPropertyRef = push(propertiesRef);
      await set(newPropertyRef, {
        location: newProperty.location,
        price: newProperty.price,
        propertyType: newProperty.propertyType,
        area: newProperty.area,
      });

      setNewProperty({
        location: "",
        price: "",
        propertyType: "",
        area: "",
      });
    } catch (error) {
      return [];
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
        return [];
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex bg-[#f7eed2] flex-row min-h-screen ">
        <div className="w-80 bg-[#f7eed2] text-[#1a237e] overflow-hidden text-base opacity-90  sticky top-0 left-0 h-[90vh]  ">
          <h1 className="text-2xl font-bold text-center pt-6  ">
            Submit Your Listing
          </h1>
          <p className="text-base px-4 py-2 text-center">
            Enter the necessary information to create a listing for your
            property.
          </p>
          <form onSubmit={addProperty} className="flex flex-col m-2">
            <div className="flex flex-col m-2">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={newProperty.location}
                onChange={handleChange}
                placeholder="Enter location"
                autoFocus
                className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black] "
                required
              />
              {errors.location && (
                <span className="text-[#e16b35]">{errors.location}</span>
              )}
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="price" className="text-sm font-semibold">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={newProperty.price}
                onChange={handleChange}
                placeholder="Enter price"
                autoFocus
                className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
                required
              />
              {errors.price && (
                <span className="text-[#e16b35]">{errors.price}</span>
              )}
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="propertyType" className="block mb-2">
                Property Type
              </label>
              <input
                type="text"
                id="propertyType"
                name="propertyType"
                autoComplete="off"
                placeholder="Enter property type"
                value={newProperty.propertyType}
                onChange={handleChange}
                className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
              />
              {errors.propertyType && (
                <span className="text-[#e16b35]">{errors.propertyType}</span>
              )}
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="area" className="block mb-2">
                Area in sqft
              </label>
              <input
                type="number"
                id="area"
                name="area"
                className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black]"
                placeholder="Enter area in sqft"
                value={newProperty.area}
                onChange={handleChange}
                required
              />
              {errors.area && (
                <span className="text-[#e16b35]">{errors.area}</span>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="max-w-fit mx-auto px-4 py-2 text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a] focus:ring-1 focus:ring-[black]"
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
        <div className=" bg-[#FFFAE9] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-12 ml-4">
          <h1 className="text-4xl font-bold text-center col-span-3 mt-4">
            Listed Properties
          </h1>
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-[#ffffffd5] shadow-xl rounded-lg overflow-hidden cursor-pointer "
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
