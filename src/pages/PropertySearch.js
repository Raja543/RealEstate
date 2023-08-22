import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CarouselBanner from "../components/CarouselBanner/CarouselBanner";
import { AreaChart, Building2, MapPin } from "lucide-react";
import { IndianRupee } from "lucide-react";

const PropertySearch = () => {
  const [housename] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnitureType, setfurnitureType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [area, setArea] = useState("");
  const [displayProperties, setDisplayProperties] = useState([]);
  const [matchingProperties, setMatchingProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchCriteria = {
      housename,
      location,
      price,
      propertyType,
      bedrooms,
      area,
      furnitureType,
    };

    try {
      setLoading(true); // Set loading to true while fetching data
      setError(null); // Clear any previous error
      const matchingProperties = await performPropertySearch(searchCriteria);
      setMatchingProperties(matchingProperties);
    } catch (error) {
      setError("Error performing search");
    } finally {
      setLoading(false); // Set loading back to false after fetching data
    }
  };

  const performPropertySearch = async (searchCriteria) => {
    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const snapshot = await get(propertiesRef);

      const allProperties = [];
      snapshot.forEach((childSnapshot) => {
        allProperties.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      // Apply client-side filtering based on the search criteria
      const matchingProperties = allProperties.filter((property) => {
        if (
          searchCriteria.location &&
          property.location !== searchCriteria.location
        ) {
          return false;
        }

        if (
          searchCriteria.priceRange &&
          property.price !== searchCriteria.price
        ) {
          return false;
        }

        if (
          searchCriteria.propertyType &&
          property.propertyType !== searchCriteria.propertyType
        ) {
          return false;
        }

        if (
          searchCriteria.bedrooms &&
          property.bedrooms !== searchCriteria.bedrooms
        ) {
          return false;
        }

        if (searchCriteria.area && property.area !== searchCriteria.area) {
          return false;
        }

        return true;
      });

      console.log("Matching Properties:", matchingProperties);

      return matchingProperties;
    } catch (error) {
      console.log("Error performing search:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const db = getDatabase();
        const propertiesRef = ref(db, "properties");
        const snapshot = await get(propertiesRef);
        const allProperties = [];
        snapshot.forEach((childSnapshot) => {
          allProperties.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        // Randomly select 6 properties
        const shuffledProperties = shuffleArray(allProperties);
        const selectedProperties = shuffledProperties.slice(0, 6);
        setDisplayProperties(selectedProperties);
      } catch (error) {
        setError("Error fetching properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      <Navbar />
      <div height={200} width={300}>
        <CarouselBanner />
      </div>

      {/* search bar */}
      <div
        className="container  flex-col z-20 mx-auto w-3/5 px-4 py-8 mt-[-30px] bg-textwhite rounded-lg shadow-xl"
        style={{ position: "relative" }}
      >
        <div className="flex justify-between items-center ">
          <div className="mb-4">
            <label htmlFor="propertyType" className="block mb-1">
              Property Type:
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="residential">Residential</option>
              <option value="pg/co-liing">PG/Co-living</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-2/4"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex flex-row justify-between items-center ">
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Price :
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="propertyType" className="block mb-1">
              Furniture type:
            </label>
            <select
              id="furnitureType"
              value={furnitureType}
              onChange={(e) => setfurnitureType(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="Non-furnished">Non-furnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Full-furnished">Full-furnished</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="bedrooms" className="block mb-1">
              Bedrooms:
            </label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="area" className="block mb-1">
              Area:
            </label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            ></input>
          </div>
        </div>
      </div>

      {/* display type of property */}
      <div className="px-10  my-4 ">
        <h1 className="text-2xl text-center p-2">
          Get Started with real estate options
        </h1>
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col mx-6 my-4">
            <img src="/images/d1.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">Buying a home</p>
          </div>
          <div className="flex flex-col  mx-6 my-4 ">
            <img src="/images/d2.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">Renting a home</p>
          </div>
          <div className="flex flex-col  mx-6 my-4">
            <img src="/images/d3.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">Sell/Rent your Property</p>
          </div>
          <div className="flex flex-col  mx-6 my-4">
            <img src="/images/d4.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">PG and co-living</p>
          </div>
          <div className="flex flex-col  mx-6 my-4">
            <img src="/images/d5.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">Buying commercial space</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center p-4 font-extrabold max-w-xl">
          Find Better Places to Live, Work and Wonder...
        </h1>
      </div>

      {/* display house card */}
      <div>
        <div className="mt-8">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-32">
            {matchingProperties.length === 0
              ? displayProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white shadow-xl  rounded-lg overflow-hidden cursor-pointer "
                  >
                    <div
                      className="bg-cover bg-center h-56 p-4"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)",
                      }}
                    ></div>
                    <div className="p-4">
                      <p className="Capitalize text-left text-2xl font-extrabold py-2">
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
                    </div>
                  </div>
                ))
              : matchingProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white shadow-xl  rounded-lg overflow-hidden"
                  >
                    <div
                      className="bg-cover bg-center h-56 p-4"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)",
                      }}
                    >
                      <div className="flex justify-end">
                        <svg
                          className="h-6 w-6 text-white fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                        <Building2 /> {property.housename}
                      </p>
                      <div className="text-3xl text-gray-900 flex-row">
                        <IndianRupee /> {property.price}
                      </div>
                      <div className="text-gray-700 flex-row">
                        <MapPin /> {property.location}
                      </div>
                      <div>
                        <p className="text-gray">{property.area}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertySearch;
