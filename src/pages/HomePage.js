import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// HomePage.tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.js";
import CTASection from "../components/CTASection.js";
import LoginProcedureSection from "../components/LoginProcedureSection.js";
import Testimonials from "../components/Testimonials.js";
import { Helmet } from "react-helmet";
const HomePage = () => {
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get("ref");
    useEffect(() => {
        if (referralCode) {
            localStorage.setItem("referralCode", referralCode);
            console.log(`Referral code set: ${referralCode}`);
        }
    }, [referralCode]);
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Find Your Dream Home - Best Real Estate Platform" }), _jsx("meta", { name: "description", content: "Explore the best real estate listings including rooms, apartments, and houses. Find affordable homes with detailed info and images." }), _jsx("meta", { name: "keywords", content: "real estate, apartments, houses for rent, rooms for rent, property listings, buy home, rent home" }), _jsx("meta", { name: "author", content: "Your Company Name" }), _jsx("meta", { name: "robots", content: "index, follow" })] }), _jsx(Hero, {}), _jsx(CTASection, {}), _jsx(LoginProcedureSection, {}), _jsx(Testimonials, {})] }));
};
export default HomePage;
