import { Link } from "react-router-dom";
import { Building, Home, Users, Star, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

interface PropertyCardProps {
  property: {
    _id: string;
    name: string;
    city: string;
    area: string;
    rating?: number;
    roomCount?: number;
    vacantRoomCount?: number;
    imageUrl?: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 dark:bg-gray-900/50 group overflow-hidden">
      {/* Property Image */}
      <div className="h-32 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Building className="h-12 w-12 text-primary-600" />
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {property.name}
          </CardTitle>
          {property.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{property.rating.toFixed(1)}</span>
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">
            {property.area}, {property.city}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary/50 dark:bg-gray-900 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{property.roomCount || 0}</p>
                <p className="text-xs text-muted-foreground">Total Units</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary/50 dark:bg-gray-900 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{property.vacantRoomCount || 0}</p>
                <p className="text-xs text-muted-foreground">Vacant Now</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          asChild
          variant="default"
          className="w-full dark:hover:bg-primary-600 dark:hover:text-white"
          size="sm"
        >
          <Link to={`/landlord/dashboard/properties/${property._id}`}>
            Manage Property
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
