import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import PropTypes from "prop-types";

const AddPropertyForm = ({ onAddProperty }) => {
  const [newProperty, setNewProperty] = useState({
    housename : "",
    location: "",
    price: "",
    propertyType: "",
    area: "",
  });
  const [errors, setErrors] = useState({
    housename : "",
    location: "",
    price: "",
    propertyType: "",
    area: "",
  });

  const addProperty = async (e) => {
    e.preventDefault();
    let hasError = false;
    const updatedErrors = {};

    if (hasError) {
      setErrors(updatedErrors);
    } else {
      setErrors({
        housename : "",
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
        housename: newProperty.housename,
        location: newProperty.location,
        price: newProperty.price,
        propertyType: newProperty.propertyType,
        area: newProperty.area,
      });

      setNewProperty({
        housename : "",
        location: "",
        price: "",
        propertyType: "",
        area: "",
      });
      onAddProperty();
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={addProperty} className="flex flex-col m-2">
         <div className="flex flex-col m-2">
        <label htmlFor="location" className="font-semibold">
          Name of House
        </label>
        <input
          type="text"
          id="housename"
          name="housename"
          value={newProperty.housename}
          onChange={handleChange}
          placeholder="Enter housename"
          autoFocus
          className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-[black] "
          required
        />
        {errors.housename && (
          <span className="text-[#e16b35]">{errors.housename}</span>
        )}
      </div>
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
        {errors.price && <span className="text-[#e16b35]">{errors.price}</span>}
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
        {errors.area && <span className="text-[#e16b35]">{errors.area}</span>}
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
  );
};

AddPropertyForm.propTypes = {
  onAddProperty: PropTypes.func.isRequired,
};

export default AddPropertyForm;
