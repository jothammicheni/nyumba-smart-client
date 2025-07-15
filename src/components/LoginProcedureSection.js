/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, LayoutDashboard, CheckCircle, ArrowBigRight, ArrowRight, } from "lucide-react";
import { motion, useInView, useAnimation, easeInOut } from "framer-motion";
const LoginProcedureSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" }); // Trigger once when in view
    const controls = useAnimation();
    const [activeStep, setActiveStep] = useState(null);
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);
    // Animation variants (reverted to the more dynamic version)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.15,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeInOut,
            },
        },
    };
    const stepVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easeInOut,
            },
        },
        hover: {
            y: -15,
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: easeInOut,
            },
        },
    };
    const numberVariants = {
        hover: {
            scale: 1.2,
            rotate: 360,
            transition: {
                duration: 0.6,
                ease: easeInOut,
            },
        },
    };
    const iconVariants = {
        hover: {
            scale: 1.3,
            rotate: [0, -10, 10, 0],
            transition: {
                duration: 0.5,
                ease: easeInOut,
            },
        },
    };
    const arrowVariants = {
        animate: {
            x: [0, 10, 0],
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: easeInOut,
            },
        },
    };
    const steps = [
        {
            number: 1,
            icon: UserPlus,
            title: "Create Account",
            description: "Sign up as a landlord, tenant, agent, or service provider with our secure registration process.",
            color: "from-primary-500/10 to-primary-600/20",
            hoverColor: "from-primary-500/20 to-primary-600/30",
            iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
            delay: 0.1,
        },
        {
            number: 2,
            icon: LogIn,
            title: "Secure Login",
            description: "Access your personalized dashboard with enterprise-grade security and two-factor authentication.",
            color: "from-primary-500/10 to-primary-600/20",
            hoverColor: "from-primary-500/20 to-primary-600/30",
            iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
            delay: 0.2,
        },
        {
            number: 3,
            icon: LayoutDashboard,
            title: "Smart Dashboard",
            description: "Navigate your role-based dashboard with AI-powered insights and real-time analytics.",
            color: "from-primary-500/10 to-primary-600/20",
            hoverColor: "from-primary-500/20 to-primary-600/30",
            iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
            delay: 0.3,
        },
        {
            number: 4,
            icon: CheckCircle,
            title: "Start Managing",
            description: "Begin your property management journey with our comprehensive suite of tools and features.",
            color: "from-primary-500/10 to-primary-600/20",
            hoverColor: "from-primary-500/20 to-primary-600/30",
            iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
            delay: 0.4,
        },
    ];
    return (_jsxs("section", { ref: ref, className: "py-20 relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-[0.02] dark:opacity-[0.05]", children: _jsx("div", { className: "h-full w-full", style: {
                                backgroundImage: `
              linear-gradient(rgba(var(--primary-500-rgb), 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary-500-rgb), 0.3) 1px, transparent 1px)
            `, // Using primary-500 rgb value (assuming it's defined in CSS vars or Tailwind config)
                                backgroundSize: "80px 80px",
                            } }) }), _jsx(motion.div, { className: "absolute top-20 left-20 w-40 h-40 border border-primary-200/30 dark:border-primary-800/30 rounded-full", animate: {
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }, transition: {
                            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        } }), _jsx(motion.div, { className: "absolute bottom-32 right-32 w-32 h-32 border border-primary-200/30 dark:border-primary-800/30 rotate-45 rounded-2xl", animate: {
                            rotate: [45, 405],
                            y: [0, -30, 0],
                        }, transition: {
                            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        } }), _jsx(motion.div, { className: "absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/5 to-primary-500/5 rounded-full blur-3xl", animate: {
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }, transition: {
                            duration: 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        } }), _jsx(motion.div, { className: "absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-primary-400/5 to-primary-500/5 rounded-full blur-3xl", animate: {
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }, transition: {
                            duration: 12,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 2,
                        } })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [_jsxs(motion.div, { className: "text-center mb-20", variants: containerVariants, initial: "hidden", animate: controls, children: [_jsxs(motion.h2, { className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6", variants: itemVariants, children: ["Get Started with", " ", _jsx(motion.span, { className: "bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 1 }, children: "NyumbaSmart" })] }), _jsx(motion.p, { className: "mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300 mx-auto leading-relaxed", variants: itemVariants, children: "Transform your property management experience with our intuitive platform. Join thousands of satisfied users in just four simple steps." })] }), _jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20", variants: containerVariants, initial: "hidden", animate: controls, children: steps.map((step, index) => {
                            const IconComponent = step.icon;
                            const isLast = index === steps.length - 1;
                            return (_jsxs(motion.div, { className: "relative group", variants: stepVariants, whileHover: "hover", onHoverStart: () => setActiveStep(index), onHoverEnd: () => setActiveStep(null), children: [_jsxs("div", { className: "relative bg-white/80 dark:bg-gray-950/50 backdrop-blur-xl shadow-xl hover:shadow-2xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500", children: [_jsx(motion.div, { className: `absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100`, initial: { scale: 0, rotate: 45 }, whileHover: { scale: 1.5, rotate: 0 }, transition: { duration: 0.5 } }), _jsx(motion.div, { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500", style: {
                                                    background: `radial-gradient(circle at 50% 50%, var(--primary-500), transparent 70%)`, // Using primary-500 CSS variable
                                                } }), _jsx(motion.div, { className: `absolute -top-3 -left-3 ${step.iconBg} text-white rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-xl shadow-xl z-20 border-4 border-white dark:border-gray-900/30`, variants: numberVariants, whileHover: "hover", children: step.number }), _jsxs("div", { className: "flex flex-col items-center pt-8 relative z-10", children: [_jsx(motion.div, { className: `p-5 ${step.iconBg} rounded-3xl mb-6 shadow-lg`, variants: iconVariants, whileHover: "hover", children: _jsx(IconComponent, { className: "h-8 w-8 text-white" }) }), _jsx(motion.h3, { className: "text-xl font-bold text-gray-900 dark:text-white text-center mb-4", initial: { opacity: 0.8 }, whileHover: { opacity: 1 }, children: step.title }), _jsx(motion.p, { className: "text-gray-600 dark:text-gray-300 text-center leading-relaxed", initial: { opacity: 0.7 }, whileHover: { opacity: 1 }, children: step.description })] }), _jsx(motion.div, { className: `absolute bottom-0 left-0 h-1 ${step.iconBg} rounded-b-3xl`, initial: { width: "0%" }, whileHover: { width: "100%" }, transition: { duration: 0.3 } }), _jsx(motion.div, { className: "absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300", initial: { scale: 0 }, whileHover: { scale: 1 } })] }), !isLast && (_jsx(motion.div, { className: "hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10", variants: arrowVariants, animate: "animate", children: _jsx(motion.div, { className: "bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700", whileHover: { scale: 1.2, rotate: 360 }, transition: { duration: 0.5 }, children: _jsx(ArrowBigRight, { className: "text-primary-500 w-6 h-6" }) }) }))] }, step.number));
                        }) }), _jsx("div", { className: "text-center", children: _jsxs("div", { className: "inline-flex flex-col items-center space-y-4 p-6 sm:p-8 bg-white/60 dark:bg-gray-950/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-primary-600/5 shadow-lg sm:shadow-2xl", children: [_jsx("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "Ready to get started?" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-md", children: "Join thousands of users who are already managing their properties efficiently" }), _jsxs(Link, { to: "/register", className: "inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4 border border-transparent text-sm sm:text-base lg:text-lg font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 transition duration-300 pulse-animation", children: [_jsx("span", { className: "relative z-10", children: "Create Your Account Now" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsx(ArrowRight, { className: "relative ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" })] })] }) })] })] }));
};
export default LoginProcedureSection;
