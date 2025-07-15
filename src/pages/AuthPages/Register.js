/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
console.log(">>> Loaded: registers the component file (top-level)");
import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const { register, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isReferralFromStorage, setIsReferralFromStorage] = useState(false);
    const [formData, setFormData] = useState({
        referredBy: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "tenant",
        city: "",
        serviceType: "",
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    useEffect(() => {
        console.log("Register component mounted");
    }, []);
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin-panel");
            }
            else {
                navigate(`/${user.role}/dashboard`);
            }
        }
    }, [isAuthenticated, user, navigate]);
    //check for the refferal code
    // Check for referral code when role becomes landlord
    useEffect(() => {
        try {
            if (formData.role === "landlord") {
                const code = localStorage.getItem("referralCode");
                console.log("Referral code found from localstorage:", code);
                if (code) {
                    setFormData(prev => ({
                        ...prev,
                        referredBy: code
                    }));
                    setIsReferralFromStorage(true);
                    localStorage.removeItem("referralCode");
                }
            }
        }
        catch (err) {
            console.error("Failed to read from localStorage:", err);
        }
    }, [formData.role]);
    //handle role sellection
    const handleRoleSelection = (newRole) => {
        if (newRole === "landlord") {
            const referral = localStorage.getItem("referralCode");
            if (referral) {
                setFormData(prev => ({
                    ...prev,
                    role: newRole,
                    referredBy: referral
                }));
                setIsReferralFromStorage(true);
                localStorage.removeItem("referralCode");
                console.log("Referral code set from localStorage:", referral);
            }
            else {
                setFormData(prev => ({
                    ...prev,
                    role: newRole,
                    referredBy: ""
                }));
                setIsReferralFromStorage(false);
                console.log("No referral code found in localStorage.");
            }
        }
        else {
            setFormData(prev => ({
                ...prev,
                role: newRole,
                referredBy: ""
            }));
            setIsReferralFromStorage(false);
        }
    };
    // Password strength indicators
    const hasMinLength = formData.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    const getPasswordStrengthText = () => {
        if (passwordStrength === 0)
            return "";
        if (passwordStrength <= 2)
            return "Weak";
        if (passwordStrength <= 4)
            return "Medium";
        return "Strong";
    };
    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0)
            return "bg-gray-200";
        if (passwordStrength <= 2)
            return "bg-red-500";
        if (passwordStrength <= 4)
            return "bg-yellow-500";
        return "bg-green-500";
    };
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? e.target.checked : undefined;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        // Validate phone
        // Validate phone
        const rawPhone = formData.phone.replace(/\s+/g, "").trim();
        if (!rawPhone) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^(\+?254|0)(7|1)\d{8}$/.test(rawPhone)) {
            newErrors.phone = "Phone must start with 07, 01, or 254 and be 10–12 digits";
        }
        // Validate city
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }
        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        else if (passwordStrength < 3) {
            newErrors.password = "Password is too weak";
        }
        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        // Validate service type for service providers
        if (formData.role === "service-provider" && !formData.serviceType) {
            newErrors.serviceType = "Service type is required";
        }
        // Validate terms agreement
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms and conditions";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setErrors({});
            console.log(4556);
            try {
                const userData = {
                    referredBy: formData.referredBy,
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    phone: formData.phone,
                    city: formData.city,
                    service_category: formData.serviceType,
                };
                console.log("Registration response:", userData);
                const response = await register(userData);
                if (response.success) {
                    setRegistrationSuccess(true);
                }
                else {
                    setErrors({
                        general: response.message || "Registration failed. Please try again.",
                    });
                }
            }
            catch (error) {
                setErrors({
                    general: error.message || "An unexpected error occurred. Please try again.",
                });
            }
            finally {
                setIsSubmitting(false);
            }
        }
    };
    if (registrationSuccess) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg", children: _jsxs("div", { className: "text-center", children: [_jsx(CheckCircle, { className: "mx-auto h-16 w-16 text-green-500" }), _jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900 dark:text-white", children: "Registration Successful!" }), _jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-300", children: "Your account has been created. You will be redirected to your dashboard..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-400/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60", children: _jsx("div", { className: "max-w-2xl mx-auto", children: _jsx("div", { className: "bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden", children: _jsxs("div", { className: "px-6 py-8 sm:p-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: "Create Your NyumbaSmart Account" }), _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: "Join our platform and start managing your properties efficiently" })] }), errors.general && (_jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md", children: _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: errors.general }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-2 gap-4 mb-6", children: _jsxs("div", { className: "col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Register As:" }), _jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [
                                                    { value: "landlord", label: "Landlord" },
                                                    { value: "tenant", label: "Tenant" },
                                                    { value: "agent", label: "Agent" },
                                                    { value: "service-provider", label: "Service Provider" },
                                                ].map((role) => (_jsx("div", { className: `
                             border rounded-lg p-3 text-center cursor-pointer transition-all
                             ${formData.role === role.value
                                                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                                                        : "border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"}
                           `, onClick: () => handleRoleSelection(role.value), children: role.label }, role.value))) })] }) }), formData.role === "service-provider" && (_jsxs("div", { children: [_jsx("label", { htmlFor: "serviceType", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Service Type" }), _jsxs("select", { id: "serviceType", name: "serviceType", value: formData.serviceType, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.serviceType ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       `, children: [_jsx("option", { value: "", children: "Select service type" }), _jsx("option", { value: "wifi", children: "WiFi Provider" }), _jsx("option", { value: "plumbing", children: "Plumbing Services" }), _jsx("option", { value: "electrical", children: "Electrical Services" }), _jsx("option", { value: "cleaning", children: "Cleaning Services" }), _jsx("option", { value: "security", children: "Security Services" }), _jsx("option", { value: "other", children: "Other" })] }), errors.serviceType && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.serviceType })] })), formData.role === "landlord" && (_jsxs("div", { children: [_jsxs("label", { htmlFor: "referredBy", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: ["Agent Referral Code ", isReferralFromStorage && "(Auto-detected)"] }), _jsx("input", { id: "referredBy", name: "referredBy", type: "text", value: formData.referredBy, onChange: handleChange, readOnly: isReferralFromStorage, placeholder: "Enter agent referral code", className: `
           block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
           ${errors.referredBy ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
           ${isReferralFromStorage
                                                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                                : "bg-white dark:bg-gray-700"}
           text-gray-900 dark:text-gray-100
         ` }), errors.referredBy && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.referredBy })] })), _jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "firstName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "First Name" }), _jsx("input", { id: "firstName", name: "firstName", type: "text", value: formData.firstName, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       ` }), errors.firstName && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.firstName })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "lastName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Last Name" }), _jsx("input", { id: "lastName", name: "lastName", type: "text", value: formData.lastName, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       ` }), errors.lastName && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.lastName })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email Address" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", value: formData.email, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"}
                          bg-white dark:dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       ` }), errors.email && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Phone Number" }), _jsx("input", { id: "phone", name: "phone", type: "tel", value: formData.phone, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       `, placeholder: "+254 7XX XXX XXX" }), errors.phone && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.phone })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "city", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "City" }), _jsx("input", { id: "city", name: "city", type: "text", value: formData.city, onChange: handleChange, className: `
                       block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                       ${errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     ` }), errors.city && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.city })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", value: formData.password, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       ` }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] }), errors.password && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password }), formData.password && (_jsxs("div", { className: "mt-2", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Password strength:" }), _jsx("span", { className: `text-xs font-medium ${passwordStrength <= 2
                                                                ? "text-red-500"
                                                                : passwordStrength <= 4
                                                                    ? "text-yellow-500"
                                                                    : "text-green-500"}`, children: getPasswordStrengthText() })] }), _jsx("div", { className: "h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${getPasswordStrengthColor()}`, style: { width: `${(passwordStrength / 5) * 100}%` } }) }), _jsxs("div", { className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2", children: [_jsxs("div", { className: "flex items-center", children: [hasMinLength ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mr-1" })) : (_jsx(XCircle, { className: "h-4 w-4 text-gray-400 mr-1" })), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "At least 8 characters" })] }), _jsxs("div", { className: "flex items-center", children: [hasUpperCase ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mr-1" })) : (_jsx(XCircle, { className: "h-4 w-4 text-gray-400 mr-1" })), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Uppercase letter" })] }), _jsxs("div", { className: "flex items-center", children: [hasLowerCase ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mr-1" })) : (_jsx(XCircle, { className: "h-4 w-4 text-gray-400 mr-1" })), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Lowercase letter" })] }), _jsxs("div", { className: "flex items-center", children: [hasNumber ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mr-1" })) : (_jsx(XCircle, { className: "h-4 w-4 text-gray-400 mr-1" })), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Number" })] }), _jsxs("div", { className: "flex items-center", children: [hasSpecialChar ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mr-1" })) : (_jsx(XCircle, { className: "h-4 w-4 text-gray-400 mr-1" })), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Special character" })] })] })] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? "text" : "password", value: formData.confirmPassword, onChange: handleChange, className: `
                         block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                         ${errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       ` }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] }), errors.confirmPassword && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.confirmPassword })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "agreeTerms", name: "agreeTerms", type: "checkbox", checked: formData.agreeTerms, onChange: handleChange, className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }) }), _jsxs("div", { className: "ml-3 text-sm", children: [_jsxs("label", { htmlFor: "agreeTerms", className: "font-medium text-gray-700 dark:text-gray-300", children: ["I agree to the", " ", _jsx("a", { href: "#", className: "text-primary-600 hover:text-primary-500", children: "Terms and Conditions" }), " ", "and", " ", _jsx("a", { href: "#", className: "text-primary-600 hover:text-primary-500", children: "Privacy Policy" })] }), errors.agreeTerms && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.agreeTerms })] })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isSubmitting, className: `
                       w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                       ${isSubmitting ? "bg-primary-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"}
                       transition-colors duration-200
                     `, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), " Creating Account..."] })) : ("Create Account") }) })] }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["Already have an account?", " ", _jsx("a", { href: "/login", className: "font-medium text-primary-600 hover:text-primary-500", children: "Sign in" })] }) })] }) }) }) }));
};
export default Register;
