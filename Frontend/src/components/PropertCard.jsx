import React from "react";
import { IndianRupee, AreaChart, Building2, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const PropertyCard = ({ property }) => {
  const handleBuyNow = (houseName) => {
    window.alert(`Thank you for buying ${houseName}!`);
  };
  return (
    <div
      key={property.id}
      className="bg-[#ffffffd5] shadow-xl rounded-lg overflow-hidden cursor-pointer"
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
            onClick={() => handleBuyNow(property.housename)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    housename: PropTypes.string,
    price: PropTypes.number,
    area: PropTypes.number,
    location: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired,
  }).isRequired,
};

export default PropertyCard;
