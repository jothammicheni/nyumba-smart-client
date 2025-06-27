import type React from "react";
import { Link } from "react-router-dom";
import { Building, Home, Users } from "lucide-react";

interface PropertyCardProps {
  property: {
    _id: string;
    name: string;
    city: string;
    area: string;
    roomCount?: number;
    vacantRoomCount?: number;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <Building className="h-10 w-10 text-primary-600 dark:text-primary-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {property.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {property.area}, {property.city}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Home className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {property.roomCount || 0} Units
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {property.vacantRoomCount || 0} Vacant
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/landlord/dashboard/properties/${property._id}`}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Manage Property
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
