import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CarouselBanner from "../components/CarouselBanner";
import PropertyCard from "../components/PropertCard";

const FindProperty = () => {
  const [location, setLocation] = useState("");
  const [displayProperties, setDisplayProperties] = useState([]);
  const [matchingProperties, setMatchingProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchCriteria = {
      location,
    };

    try {
      setLoading(true);
      setError(null);
      const matchingProperties = await performPropertySearch(searchCriteria);
      setMatchingProperties(matchingProperties);
      if (matchingProperties.length > 0) {
        const houseCardSection = document.getElementById("houseCardSection");
        if (houseCardSection) {
          houseCardSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/404");
      }
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
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

      const matchingProperties = allProperties.filter((property) => {
        if (
          searchCriteria.location &&
          property.location !== searchCriteria.location
        ) {
          return false;
        }
        return true;
      });

      if (matchingProperties.length === 0) {
        setError("No matching properties found.");
      } else {
        setError(null);
      }
      return matchingProperties;
    } catch (error) {
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
        className="container hidden lg:block flex-col z-20 mx-auto w-2/6 px-4  mt-[-30px] bg-textwhite rounded-lg shadow-xl"
        style={{ position: "relative" }}
      >
        <div className="flex justify-between items-center ">
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-3/4 "
            placeholder="Enter the Location e.g Jaipur"
          />
          <button
            className="bg-orange text-[#fff] font-bold py-2 px-4 my-2 rounded-lg mx-auto"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* display type of property */}
      <div className="lg:px-10 my-4 ">
        <h1 className="text-lg md:text-2xl text-center p-2">
          Get Started with real estate options
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center px-14 sm:px-0">
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
          <div className="flex flex-col mx-6 my-4">
            <img src="/images/d5.webp" alt="display1"></img>
            <p className="text-sm text-center p-4">Buying commercial space</p>
          </div>
        </div>
      </div>

      <div
        id="houseCardSection"
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl lg:text-4xl text-center p-4 font-extrabold max-w-xl">
          Find Better Places to Live, Work and Wonder...
        </h1>
      </div>

      {/* display house card */}
      <div>
        <div className="lg:mt-8 ">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-8 my-4 lg:mx-40 lg:my-10">
              {matchingProperties.length === 0
                ? displayProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                : matchingProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-8 my-4 lg:mx-40 lg:my-10">
        <h1 className="text-2xl lg:text-4xl px-4 py-4 lg:py-8 font-extrabold text-center ">
          Explore the best properties in your city
        </h1>
        <div className="grid lg:grid-cols-4 items-center ">
          <div className="flex flex-row my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c1.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Delhi / NCR</p>
              <p className="text-base">59,000+ properties</p>
            </div>
          </div>
          <div className="flex flex-row  my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c2.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Banglore</p>
              <p className="text-base">15,000+ properties</p>
            </div>
          </div>
          <div className="flex flex-row  my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c3.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Pune</p>
              <p className="text-base">19,000+ properties</p>
            </div>
          </div>
          <div className="flex flex-row  my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c4.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Chennai</p>
              <p className="text-base">17,000+ properties</p>
            </div>
          </div>
          <div className="flex flex-row  my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c5.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Mumbai</p>
              <p className="text-base">37,000+ properties</p>
            </div>
          </div>
          <div className="flex flex-row  my-4">
            <img
              width={100}
              height={98}
              className="rounded-lg object-cover"
              src="/images/c6.jpeg"
              alt="display1"
            ></img>
            <div className="flex flex-col p-2 justify-center ">
              <p className="text-xl font-extrabold py-2">Hyderabad</p>
              <p className="text-base">48,000+ properties</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center lg:m-16">
        <h1 className="text-2xl lg:text-4xl text-center font-black p-4 w-full lg:max-w-2xl">
          Choose from a wide variety of commercial properties
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center mx-6">
          <div
            className="flex flex-col mx-6 my-4 px-8 sm:px-16 py-12 sm:py-20 bg-[#e5e3e3] relative bg-opacity-60 bg-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bgc1.webp')",
              width: "100%",
              height: "450px",
              backgroundBlendMode: "overlay",
            }}
          >
            <p className="text-base sm:text-left p-2 font-bold uppercase text-[#626a78]">
              Buy For commercial use
            </p>
            <h1 className="text-2xl sm:text-4xl text-left font-black leading-10 p-2">
              Buy a commercial property
            </h1>
            <p className="text-base text-left p-2 font-bold">
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories and more
            </p>
            <button className="max-w-fit px-4 py-2 text-base lg:text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a]">
              Explore Buying Commercial
            </button>
          </div>
          <div
            className="flex flex-col mx-6 my-4 px-8 sm:px-16 py-12 sm:py-20 bg-[#e5e3e3] relative bg-opacity-60 bg-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bgc2.webp')",
              width: "100%", // Set width to 100% for responsiveness
              height: "450px",
              backgroundBlendMode: "overlay",
            }}
          >
            <p className="text-base sm:text-left p-2 font-bold uppercase text-[#626a78]">
              LEASE FOR COMMERCIAL USE
            </p>
            <h1 className="text-2xl lg:text-4xl text-left font-black leading-10 p-2">
              Lease a Commercial property
            </h1>
            <p className="text-base text-left p-2 font-bold">
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories and more
            </p>
            <button className="max-w-fit px-4 py-2 text-base lg:text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a]">
              Explore Leasing Commercial
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FindProperty;
