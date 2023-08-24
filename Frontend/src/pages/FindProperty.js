import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CarouselBanner from "../components/CarouselBanner/CarouselBanner";
import { AreaChart, Building2, MapPin } from "lucide-react";
import { IndianRupee } from "lucide-react";

const FindProperty = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-40 my-10">
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
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => displayRazorpay(property)} // Pass the property to the function
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Buy now
                        </button>
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
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      </div>

      <div className="mx-40 my-10">
        <h1 className="text-4xl px-4 py-8 font-extrabold ">
          Explore the best properties in your city
        </h1>
        <div className="grid grid-cols-4 items-center">
          <div className="flex flex-row  my-4">
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

      <div className="flex flex-col items-center justify-center m-16">
        <h1 className="text-4xl text-center font-black p-4  max-w-2xl">
          Choose from a wide variety of commercial properties
        </h1>
        <div className="flex flex-row items-center justify-center">
          <div
            className="flex flex-col mx-6 my-4 px-16 py-20 bg-[#e5e3e3] relative bg-opacity-60 bg-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bgc1.webp')",
              width: "512px",
              height: "450px",
              backgroundBlendMode: "overlay",
            }}
          >
            <p className="text-base text-left p-2 font-bold uppercase text-[#626a78]">
              Buy For commercial use
            </p>
            <h1 className="text-4xl text-left font-black leading-10 p-2">
              Buy a commercial property
            </h1>
            <p className="text-base text-left p-2 font-bold">
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories and more
            </p>
            <button className="max-w-fit  px-4 py-2 text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a]">
              Explore Buying Commercial
            </button>
          </div>
          <div
            className="flex flex-col mx-6 my-4 px-16 py-20 bg-[#e5e3e3] relative bg-opacity-60 bg-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bgc2.webp')",
              width: "512px",
              height: "450px",
              backgroundBlendMode: "overlay",
            }}
          >
            <p className="text-base text-left p-2 font-bold uppercase text-[#626a78]">
              {" "}
              LEASE FOR COMMERCIAL USE
            </p>
            <h1 className="text-4xl text-left font-black leading-10 p-2">
              Lease a Commercial property
            </h1>
            <p className="text-base text-left p-2 font-bold">
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories and more
            </p>
            <button className="max-w-fit  px-4 py-2 text-lg mt-4 font-semibold text-white transition-colors duration-300 bg-[#e16b35] text-[#fff] rounded-md shadow hover:bg-[#ff6d2a]">
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
