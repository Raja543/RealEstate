import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, set } from "firebase/database";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Property List</h1>
        <div className="mb-4">
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
        {properties.map((property) => (
          <div
            key={property.id}
            className="border border-gray-200 rounded p-4 mb-4"
          >
            <h2 className="text-xl font-bold mb-2">{property.location}</h2>
            <p className="text-gray-600 mb-2">Price: {property.priceRange}</p>
            <p className="text-gray-600 mb-2">Type: {property.propertyType}</p>
            <p className="text-gray-600 mb-2">Bedrooms: {property.bedrooms}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
