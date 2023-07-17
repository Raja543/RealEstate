// import React, { useState, useEffect } from "react";
// import {
//   getDatabase,
//   ref,
//   query,
//   orderByChild,
//   equalTo,
//   get,
//   push,
//   set,
// } from "firebase/database";
// import Footer from "../components/Footer/Footer";
// import Navbar from "../components/Navbar/Navbar";

// const PropertyList = () => {
//   const [location, setLocation] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [newProperty, setNewProperty] = useState([]);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const searchCriteria = {
//       location,
//       priceRange,
//       propertyType,
//       bedrooms,
//     };

//     try {
//       const matchingProperties = await performPropertySearch(searchCriteria);
//       setProperties(matchingProperties);
//     } catch (error) {
//       console.log("Error performing search:", error);
//     }
//   };

//   const performPropertySearch = async (searchCriteria) => {
//     try {
//       const db = getDatabase();
//       const propertiesRef = ref(db, "propertieslist");
//       const queryRef = query(
//         propertiesRef,
//         orderByChild("location"),
//         equalTo(searchCriteria.location)
//       );
//       const snapshot = await get(queryRef);
//       const matchingProperties = [];
//       snapshot.forEach((childSnapshot) => {
//         matchingProperties.push({
//           id: childSnapshot.key,
//           ...childSnapshot.val(),
//         });
//       });
//       return matchingProperties;
//     } catch (error) {
//       console.log("Error performing search:", error);
//       return [];
//     }
//   };

//   const addProperty = async () => {
//     try {
//       const db = getDatabase();
//       const propertiesRef = ref(db, "properties");
//       const newPropertyRef = push(propertiesRef);
//       await set(newPropertyRef, {
//         location,
//         price,
//         propertyType,
//         bedrooms,
//       });

//       setLocation("");
//       setPriceRange("");
//       setPropertyType("");
//       setBedrooms("");

//       console.log("Property data stored successfully!");
//     } catch (error) {
//       console.log("Error storing property data:", error);
//     }
//   };

//   useEffect(() => {
//     setProperties([]);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">Property List</h1>
//         <form onSubmit={addProperty} className="mb-4">
//           <input
//             type="text"
//             name="location"
//             value={newProperty.location}
//             onChange={handleChange}
//             placeholder="Location"
//             className="border border-gray-300 rounded py-2 px-4 mb-2"
//             required
//           />
//           <input
//             type="text"
//             name="price"
//             value={newProperty.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="border border-gray-300 rounded py-2 px-4 mb-2"
//             required
//           />
//           <input
//             type="text"
//             name="propertyType"
//             value={newProperty.propertyType}
//             onChange={handleChange}
//             placeholder="Property Type"
//             className="border border-gray-300 rounded py-2 px-4 mb-2"
//             required
//           />
//           <input
//             type="text"
//             name="bedrooms"
//             value={newProperty.bedrooms}
//             onChange={handleChange}
//             placeholder="No. of Bedrooms"
//             className="border border-gray-300 rounded py-2 px-4 mb-2"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//           >
//             Add Property
//           </button>
//         </form>
//         {loading ? (
//           <div>Loading properties...</div>
//         ) : (
//           properties.map((property) => (
//             <div
//               key={property.id}
//               className="border border-gray-200 rounded p-4 mb-4"
//             >
//               <h2 className="text-xl font-bold mb-2">{property.location}</h2>
//               <p className="text-gray-600 mb-2">Price: {property.priceRange}</p>
//               <p className="text-gray-600 mb-2">
//                 Type: {property.propertyType}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Bedrooms: {property.bedrooms}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PropertyList;

import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, set } from "firebase/database";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    location: "",
    price: "",
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
        price: newProperty.price,
        propertyType: newProperty.propertyType,
        bedrooms: newProperty.bedrooms,
      });

      setNewProperty({
        location: "",
        price: "",
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
      [e.target.name]: e.target.value,
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

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Property List</h1>
        <form onSubmit={addProperty} className="mb-4">
          <input
            type="text"
            name="location"
            value={newProperty.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="price"
            value={newProperty.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="propertyType"
            value={newProperty.propertyType}
            onChange={handleChange}
            placeholder="Property Type"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="bedrooms"
            value={newProperty.bedrooms}
            onChange={handleChange}
            placeholder="No. of Bedrooms"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Add Property
          </button>
        </form>
        {properties.map((property) => (
          <div
            key={property.id}
            className="border border-gray-200 rounded p-4 mb-4"
          >
            <h2 className="text-xl font-bold mb-2">{property.location}</h2>
            <p className="text-gray-600 mb-2">Price: {property.price}</p>
            <p className="text-gray-600 mb-2">
              Type: {property.propertyType}
            </p>
            <p className="text-gray-600 mb-2">Bedrooms: {property.bedrooms}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;

