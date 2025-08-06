/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import serviceGigService, { ServiceGig } from '../services/serviceGigService';
import { detectUserLocation } from '../services/userLocationService';
import ServiceProvidersSeo from '../SEO/ServiceProvidersSeo';

interface ProviderWithDistance extends ServiceGig {
  distance?: number;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const ServiceProvidersMarketplace = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [providers, setProviders] = useState<ProviderWithDistance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch and update provider data + compute distance
  const fetchAndCompute = async () => {
    const userLoc = await detectUserLocation();
    if (userLoc) {
      setUserLocation({ lat: userLoc.latitude, lon: userLoc.longitude });
    }

    const gigs = await serviceGigService.getAllGigs();
    const gigList = gigs.data;
    const withDistance = gigList.map((gig) => {
      const { latitude, longitude } = gig.provider || {};
      if (userLoc && latitude && longitude) {
        const dist = haversineDistance(
          userLoc.latitude,
          userLoc.longitude,
          latitude,
          longitude
        );
        return { ...gig, distance: dist };
      }
      return gig;
    });

    setProviders(withDistance);
  };

  useEffect(() => {
    fetchAndCompute();
    const interval = setInterval(fetchAndCompute, 60 * 1000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const filteredProviders = providers.filter((p) =>
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 my-10 max-w-screen-xl mx-auto bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <ServiceProvidersSeo/>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search for plumber, wifi, mason..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
        />
        <Button className="ml-4 whitespace-nowrap" onClick={() => navigate('/register')}>
          Sell Your Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-200"
          >
            <img
              src={provider.image || '/default-image.jpg'}
              alt={provider.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{provider.title}</h3>
                {provider.isFeatured && (
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 capitalize">{provider.category}</p>
              <p className="text-sm">📍 {provider.provider.city || 'Unknown'}</p>
              {provider.distance != null && (
                <p className="text-sm text-blue-600 font-semibold">
                  🚗 ~ {provider.distance.toFixed(1)} km near you
                </p>
              )}
              <p className="text-sm font-medium">From Ksh {provider.price}</p>
              <div className="flex items-center gap-2 pt-2">
                <Button>Message</Button>
                {provider?.provider?.phone && (
                  <a href={`tel:${provider.provider.phone}`} className="text-sm text-blue-700 underline">
                    Call: {provider.provider.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProvidersMarketplace;
