"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
// import { useTheme } from "../components/ThemeProvider.js"
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
    // const { theme } = useTheme()
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin-panel");
            }
            else {
                navigate(`/${user.role}-dashboard`);
            }
        }
    }, [isAuthenticated, user, navigate]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
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
        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setErrors({});
            try {
                const response = await login(formData.email, formData.password, formData.rememberMe);
                if (!response.success) {
                    setErrors({
                        general: response.message || "Invalid email or password",
                    });
                }
                // If successful, the useEffect will handle redirection
            }
            catch (error) {
                setErrors({
                    general: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
                });
            }
            finally {
                setIsSubmitting(false);
            }
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900 dark:text-white", children: "Sign in to your account" }), _jsxs("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: ["Or", " ", _jsx("a", { href: "/register", className: "font-medium text-primary-600 hover:text-primary-500", children: "create a new account" })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8", children: [errors.general && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" }), _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: errors.general })] })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email address" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", value: formData.email, onChange: handleChange, className: `
                  block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                  ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ` }), errors.email && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", value: formData.password, onChange: handleChange, className: `
                    block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                    ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  ` }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] }), errors.password && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "rememberMe", name: "rememberMe", type: "checkbox", checked: formData.rememberMe, onChange: handleChange, className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "rememberMe", className: "ml-2 block text-sm text-gray-700 dark:text-gray-300", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("a", { href: "#", className: "font-medium text-primary-600 hover:text-primary-500", children: "Forgot your password?" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isSubmitting, className: `
                  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isSubmitting ? "bg-primary-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"}
                  transition-colors duration-200
                `, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), " Signing in..."] })) : ("Sign in") }) })] })] })] }) }));
};
export default Login;
