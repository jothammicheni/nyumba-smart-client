import { Link } from "react-router-dom";
import { Building, Home, Users } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

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
    <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
      <CardContent className="pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <Building className="h-6 w-6 text-primary-600 dark:text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {property.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {property.area}, {property.city}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{property.roomCount || 0}</p>
              <p className="text-xs text-muted-foreground">Units</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{property.vacantRoomCount || 0}</p>
              <p className="text-xs text-muted-foreground">Vacant</p>
            </div>
          </div>
        </div>

        <Button 
          asChild
          className="w-full bg-primary-600 hover:bg-primary-700 text-white"
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
