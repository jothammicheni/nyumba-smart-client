"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building, Users, UserPlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const backgroundImages = [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80",
        "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        "https://images.unsplash.com/photo-1575789959844-bbdf1cc5e339?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym5ifGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBrZXlzfGVufDB8fDB8fHww",
    ];
    const userRoles = [
        {
            role: "landlord",
            title: "Landlord",
            description: "Manage your properties, track rent payments, and handle maintenance requests",
            icon: Building,
            color: "from-primary-600 to-primary-600",
        },
        {
            role: "tenant",
            title: "Tenant",
            description: "Pay rent, file maintenance issues, and receive important notifications",
            icon: Users,
            color: "from-primary-600 to-primary-600",
        },
        {
            role: "agent",
            title: "Agent",
            description: "Refer landlords and earn recurring income through our platform",
            icon: UserPlus,
            color: "from-primary-600 to-primary-600",
        },
    ];
    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [backgroundImages.length]);
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeInOut,
            },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, x: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easeInOut,
            },
        },
        hover: {
            scale: 1.05,
            y: -5,
            transition: {
                duration: 0.2,
                ease: easeInOut,
            },
        },
    };
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: easeInOut,
            },
        },
        tap: {
            scale: 0.95,
        },
    };
    return (_jsxs("div", { className: "relative h-screen overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx(AnimatePresence, { mode: "wait", children: backgroundImages.map((img, index) => index === currentSlide && (_jsx(motion.img, { src: img, alt: "Modern apartment building", className: "absolute inset-0 w-full h-full object-cover", initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 1, ease: "easeInOut" } }, index))) }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1 } })] }), _jsx("div", { className: "relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { className: "max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", variants: containerVariants, initial: "hidden", animate: isLoaded ? "visible" : "hidden", children: [_jsxs("div", { className: "text-center lg:text-left", children: [_jsx(motion.div, { variants: itemVariants, className: "mb-6", children: _jsx(motion.h1, { className: "text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6", initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 }, children: "Transform Your Property Management Experience" }) }), _jsx(motion.p, { className: "text-lg md:text-xl text-gray-200 mb-10", variants: itemVariants, children: "NyumbaSmart helps landlords manage properties, track rent payments, and keep tenants happy with our all-in-one platform." }), _jsxs(motion.div, { className: "flex flex-col sm:flex-row justify-center lg:justify-start gap-4", variants: itemVariants, children: [_jsx(motion.div, { variants: buttonVariants, whileHover: "hover", whileTap: "tap", children: _jsxs(Link, { to: "/register", className: "group inline-flex items-center px-8 py-3 text-base font-medium rounded-xl text-white bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl", children: ["Get Started", _jsx(motion.div, { className: "ml-2", animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY }, children: _jsx(ArrowRight, { className: "h-5 w-5" }) })] }) }), _jsx(motion.div, { variants: buttonVariants, whileHover: "hover", whileTap: "tap", children: _jsx(Link, { to: "/about", className: "inline-flex items-center px-8 py-3 text-base font-medium rounded-xl text-primary-600 bg-white/90 backdrop-blur-sm hover:bg-white md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl", children: "Learn More" }) })] })] }), _jsxs(motion.div, { className: "hidden lg:flex flex-col gap-6", variants: itemVariants, children: [_jsx(motion.div, { className: "text-center text-white text-2xl font-bold mb-2", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.4 }, children: "Join Us As" }), _jsx("div", { className: "grid grid-cols-1 gap-6", children: userRoles.map((roleData, index) => {
                                        const IconComponent = roleData.icon;
                                        return (_jsx(motion.div, { variants: cardVariants, whileHover: "hover", initial: "hidden", animate: "visible", transition: { delay: 0.6 + index * 0.1 }, children: _jsxs(Link, { to: `/register?role=${roleData.role}`, className: "block bg-white/10 backdrop-blur-md hover:bg-white/20 p-6 rounded-2xl border border-white/20 transform transition-all duration-300 group relative overflow-hidden", children: [_jsx(motion.div, { className: `absolute inset-0 bg-gradient-to-r ${roleData.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`, initial: { scale: 0, rotate: 45 }, whileHover: { scale: 1.5, rotate: 0 }, transition: { duration: 0.3 } }), _jsxs("div", { className: "flex items-center relative z-10", children: [_jsx(motion.div, { className: `bg-gradient-to-r ${roleData.color} p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300`, whileHover: { rotate: 360 }, transition: { duration: 0.5 }, children: _jsx(IconComponent, { className: "h-8 w-8 text-white" }) }), _jsxs("div", { children: [_jsx(motion.h3, { className: "text-xl font-bold text-white mb-1", initial: { opacity: 0.8 }, whileHover: { opacity: 1 }, children: roleData.title }), _jsx(motion.p, { className: "text-gray-200 group-hover:text-white transition-colors duration-300", initial: { opacity: 0.7 }, whileHover: { opacity: 1 }, children: roleData.description })] })] }), _jsx(motion.div, { className: "absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", initial: { x: -10 }, whileHover: { x: 0 }, children: _jsx(ArrowRight, { className: "h-5 w-5 text-white" }) })] }) }, roleData.role));
                                    }) })] })] }) }), _jsx(motion.div, { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 1 }, children: backgroundImages.map((_, index) => (_jsx(motion.button, { className: `w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`, onClick: () => setCurrentSlide(index), whileHover: { scale: 1.2 }, whileTap: { scale: 0.9 } }, index))) }), _jsx(motion.div, { className: "absolute bottom-8 right-8 z-20", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.5 }, children: _jsxs(motion.div, { className: "flex flex-col items-center text-white/70", animate: { y: [0, 10, 0] }, transition: { duration: 2, repeat: Number.POSITIVE_INFINITY }, children: [_jsx("span", { className: "text-sm mb-2 rotate-90 origin-center", children: "Scroll" }), _jsx("div", { className: "w-px h-8 bg-white/50" })] }) })] }));
};
export default Hero;
