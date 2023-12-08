import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddPropertyForm from "../components/AddPropertyForm";
import PropertyCard from "../components/PropertCard";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

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
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    fetchProperties();
  };

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
          <AddPropertyForm onAddProperty={handleAddProperty} />
        </div>
        <div className=" bg-[#FFFAE9] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-12 ml-4">
          <h1 className="text-4xl font-bold text-center col-span-3 mt-4">
            Listed Properties
          </h1>
          {properties.map((property) =>
            property.housename ? (
              <PropertyCard
                key={property.id}
                property={{ ...property, area: property.area.toString() }}
              />
            ) : null
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
