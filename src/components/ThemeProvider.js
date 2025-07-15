"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext(undefined);
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    });
    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    return _jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children });
};
