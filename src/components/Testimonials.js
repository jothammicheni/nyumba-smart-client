import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { motion, useInView, easeInOut } from "framer-motion";
const testimonials = [
    {
        id: 1,
        quote: "NyumbaSmart has completely transformed how I manage my rental properties. The M-Pesa integration makes rent collection effortless, and I love being able to see all my properties' financial status at a glance.",
        author: "James Mwangi",
        role: "Property Owner, Nairobi",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        quote: "As a tenant, I appreciate how easy it is to pay my rent and submit maintenance requests. The notifications are helpful reminders, and I never have to worry about keeping paper receipts anymore.",
        author: "Sarah Ochieng",
        role: "Tenant, Mombasa",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeInOut,
        }
    }
};
const cardHoverVariants = {
    hover: {
        y: -10,
        transition: {
            duration: 0.3,
            ease: easeInOut,
        }
    }
};
const Testimonials = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (_jsx("section", { ref: ref, className: "py-16 bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-16", initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl", children: "Customer Reviews" }), _jsx("p", { className: "mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto", children: "Hear from landlords and tenants who are using NyumbaSmart to simplify property management." })] }), _jsx(motion.div, { className: "grid grid-cols-1 gap-8 md:grid-cols-2", variants: containerVariants, initial: "hidden", animate: inView ? "visible" : "hidden", children: testimonials.map((testimonial) => (_jsx(motion.div, { variants: itemVariants, whileHover: "hover", className: "bg-[#FBFBFB] dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800", children: _jsxs(motion.div, { variants: cardHoverVariants, className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex-grow", children: [_jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, transition: { delay: 0.4, type: "spring" }, children: _jsx("svg", { className: "h-8 w-8 text-primary-500 mb-4", fill: "currentColor", viewBox: "0 0 32 32", children: _jsx("path", { d: "M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" }) }) }), _jsxs(motion.p, { className: "text-gray-600 dark:text-gray-300 mb-6 italic", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, children: ["\"", testimonial.quote, "\""] })] }), _jsxs(motion.div, { className: "flex items-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, children: [_jsx(motion.img, { className: "h-12 w-12 rounded-full mr-4", src: testimonial.image || "/placeholder.svg", alt: testimonial.author, whileHover: { scale: 1.1 }, transition: { type: "spring", stiffness: 400, damping: 10 } }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-900 dark:text-white font-semibold", children: testimonial.author }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: testimonial.role })] })] })] }) }, testimonial.id))) })] }) }));
};
export default Testimonials;
