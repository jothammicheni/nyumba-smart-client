/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/userLocationService.ts

const OPENCAGE_API_KEY = 'aa1f015ecb314b8e8e6257c687e81821';
const OPENCAGE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

export interface UserLocationResult {
  latitude: number;
  longitude: number;
  nearestPlace: string;
}

export const detectUserLocation = async (): Promise<UserLocationResult | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return resolve(null);
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `${OPENCAGE_API_URL}?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );
          const data = await response.json();

          if (!data.results || data.results.length === 0) {
            return resolve({
              latitude,
              longitude,
              nearestPlace: 'Unknown location',
            });
          }

          const components = data.results[0].components;

          const nearestPlace =
            components.suburb ||
            components.village ||
            components.town ||
            components.city ||
            components.county ||
            components.state ||
            components.country ||
            'Unknown location';

          resolve({
            latitude,
            longitude,
            nearestPlace,
          });
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          resolve({
            latitude,
            longitude,
            nearestPlace: 'Unknown location',
          });
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve(null);
      }
    );
  });
};
