import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building, Users, UserPlus } from "lucide-react";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Only the background images array is added
  const backgroundImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1575789959844-bbdf1cc5e339?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym5ifGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBrZXlzfGVufDB8fDB8fHww"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Modern apartment building"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main message */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Transform Your Property Management Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10">
              NyumbaSmart helps landlords manage properties, track rent payments, and keep tenants happy with our
              all-in-one platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="px-8 py-3 text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 text-base font-medium rounded-md text-primary-500 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right side - User role options */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="text-center text-white text-2xl font-bold mb-2">Join Us As</div>
            <div className="grid grid-cols-1 gap-6">
              {/* Landlord Card */}
              <Link
                to="/register?role=landlord"
                className="bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 p-6 rounded-xl border border-white border-opacity-20 transform transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center">
                  <div className="bg-primary-500 p-3 rounded-full mr-4 group-hover:bg-primary-600 transition-colors">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Landlord</h3>
                    <p className="text-gray-200">
                      Manage your properties, track rent payments, and handle maintenance requests
                    </p>
                  </div>
                </div>
              </Link>

              {/* Tenant Card */}
              <Link
                to="/register?role=tenant"
                className="bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 p-6 rounded-xl border border-white border-opacity-20 transform transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center">
                  <div className="bg-primary-500 p-3 rounded-full mr-4 group-hover:bg-primary-600 transition-colors">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Tenant</h3>
                    <p className="text-gray-200">
                      Pay rent, file maintenance issues, and receive important notifications
                    </p>
                  </div>
                </div>
              </Link>

              {/* Agent Card */}
              <Link
                to="/register?role=agent"
                className="bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 p-6 rounded-xl border border-white border-opacity-20 transform transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center">
                  <div className="bg-primary-500 p-3 rounded-full mr-4 group-hover:bg-primary-600 transition-colors">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Agent</h3>
                    <p className="text-gray-200">Refer landlords and earn recurring income through our platform</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;