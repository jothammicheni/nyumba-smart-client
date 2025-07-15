import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const ChipsInput = ({ values, setValues, placeholder }) => {
    const [input, setInput] = useState("");
    const addChip = () => {
        const trimmed = input.trim();
        if (trimmed && !values.includes(trimmed)) {
            setValues([...values, trimmed]);
        }
        setInput("");
    };
    const removeChip = (chip) => {
        setValues(values.filter((v) => v !== chip));
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip();
        }
        if (e.key === "Backspace" && !input) {
            // Optionally remove last chip if input is empty and backspace pressed
            removeChip(values[values.length - 1]);
        }
    };
    const handleChange = (e) => {
        setInput(e.target.value);
    };
    return (_jsxs("div", { className: "flex flex-wrap items-center border border-gray-300 rounded-md p-1 gap-1 bg-white dark:bg-gray-800", children: [values.map((val) => (_jsxs("div", { className: "flex items-center bg-primary-600 text-white px-2 py-1 rounded-full text-sm", children: [_jsx("span", { children: val }), _jsx("button", { type: "button", onClick: () => removeChip(val), className: "ml-1 focus:outline-none", "aria-label": `Remove ${val}`, children: "\u00D7" })] }, val))), _jsx("input", { type: "text", value: input, onChange: handleChange, onKeyDown: handleKeyDown, placeholder: placeholder || "Add room numbers", className: "flex-grow p-1 outline-none bg-transparent text-gray-900 dark:text-white text-sm" })] }));
};
export default ChipsInput;
