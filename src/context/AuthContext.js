"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService.js";
// Create context
const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => ({}),
    register: async () => ({}),
    logout: async () => { },
});
// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshToken, setRefreshToken] = useState(null);
    // Initialize auth state
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            const storedRefreshToken = localStorage.getItem("refreshToken");
            if (token && storedRefreshToken) {
                try {
                    // Set token in state
                    setRefreshToken(storedRefreshToken);
                    // Get current user
                    const response = await authService.getCurrentUser();
                    if (response.success && response.user) {
                        setUser(response.user);
                        setIsAuthenticated(true);
                    }
                    else {
                        // Try to refresh token
                        const refreshResponse = await authService.refreshAuthToken(storedRefreshToken);
                        if (refreshResponse.success && refreshResponse.token && refreshResponse.refreshToken) {
                            localStorage.setItem("token", refreshResponse.token);
                            localStorage.setItem("refreshToken", refreshResponse.refreshToken);
                            setRefreshToken(refreshResponse.refreshToken);
                            // Try again to get user
                            const userResponse = await authService.getCurrentUser();
                            if (userResponse.success && userResponse.user) {
                                setUser(userResponse.user);
                                setIsAuthenticated(true);
                            }
                            else {
                                // Clear everything if refresh failed
                                localStorage.removeItem("token");
                                localStorage.removeItem("refreshToken");
                                setUser(null);
                                setIsAuthenticated(false);
                                setRefreshToken(null);
                            }
                        }
                        else {
                            // Clear everything if refresh failed
                            localStorage.removeItem("token");
                            localStorage.removeItem("refreshToken");
                            setUser(null);
                            setIsAuthenticated(false);
                            setRefreshToken(null);
                        }
                    }
                }
                catch (error) {
                    console.error("Auth initialization error:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    setUser(null);
                    setIsAuthenticated(false);
                    setRefreshToken(null);
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);
    // Set up token refresh interval
    useEffect(() => {
        if (!refreshToken)
            return;
        const refreshInterval = setInterval(async () => {
            try {
                const response = await authService.refreshAuthToken(refreshToken);
                if (response.success && response.token && response.refreshToken) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("refreshToken", response.refreshToken);
                    setRefreshToken(response.refreshToken);
                }
                else {
                    // Clear everything if refresh failed
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    setUser(null);
                    setIsAuthenticated(false);
                    setRefreshToken(null);
                }
            }
            catch (error) {
                console.error("Token refresh error:", error);
            }
        }, 15 * 60 * 1000); // Refresh every 15 minutes
        return () => clearInterval(refreshInterval);
    }, [refreshToken]);
    // Login function
    const login = async (email, password, remember = false) => {
        try {
            const response = await authService.loginUser(email, password);
            if (response.success && response.token && response.refreshToken && response.user) {
                if (remember) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("refreshToken", response.refreshToken);
                }
                else {
                    // For session only, we still need to store the token somewhere
                    // but we'll clear it when the browser is closed
                    sessionStorage.setItem("token", response.token);
                    sessionStorage.setItem("refreshToken", response.refreshToken);
                }
                setUser(response.user);
                setIsAuthenticated(true);
                setRefreshToken(response.refreshToken);
            }
            return response;
        }
        catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "An unexpected error occurred" };
        }
    };
    // Register function
    const register = async (userData) => {
        try {
            const response = await authService.registerUser(userData);
            if (response.success && response.token && response.refreshToken && response.user) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("refreshToken", response.refreshToken);
                setUser(response.user);
                setIsAuthenticated(true);
                setRefreshToken(response.refreshToken);
            }
            return response;
        }
        catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: "An unexpected error occurred" };
        }
    };
    // Logout function
    const logout = async () => {
        try {
            await authService.logoutUser();
        }
        catch (error) {
            console.error("Logout error:", error);
        }
        finally {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
            setUser(null);
            setIsAuthenticated(false);
            setRefreshToken(null);
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isAuthenticated,
            isLoading,
            login,
            register,
            logout,
        }, children: children }));
};
// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
