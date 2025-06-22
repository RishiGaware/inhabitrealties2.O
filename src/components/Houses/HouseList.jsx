import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HouseContext } from '../../context/HouseContext';
import HouseItem from './HouseItem';
import Loader from '../common/Loader'; // Assuming you have a generic loader

const HouseList = () => {
  const { houses, isLoading } = useContext(HouseContext);

  if (isLoading) {
    return <Loader fullscreen={false} />;
  }

  if (houses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">
          Oops... No properties found.
        </h2>
        <p className="text-gray-500">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {houses.map((house) => (
          <Link to={`/property-details/${house.id}`} key={house.id}>
            <HouseItem house={house} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HouseList;