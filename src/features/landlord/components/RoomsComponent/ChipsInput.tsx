import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface ChipsInputProps {
  values: string[];
  setValues: (vals: string[]) => void;
  placeholder?: string;
}

const ChipsInput: React.FC<ChipsInputProps> = ({ values, setValues, placeholder }) => {
  const [input, setInput] = useState("");

  const addChip = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      setValues([...values, trimmed]);
    }
    setInput("");
  };

  const removeChip = (chip: string) => {
    setValues(values.filter((v) => v !== chip));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
    }
    if (e.key === "Backspace" && !input) {
      // Optionally remove last chip if input is empty and backspace pressed
      removeChip(values[values.length - 1]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-1 gap-1 bg-white dark:bg-gray-800">
      {values.map((val) => (
        <div
          key={val}
          className="flex items-center bg-primary-600 text-white px-2 py-1 rounded-full text-sm"
        >
          <span>{val}</span>
          <button
            type="button"
            onClick={() => removeChip(val)}
            className="ml-1 focus:outline-none"
            aria-label={`Remove ${val}`}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Add room numbers"}
        className="flex-grow p-1 outline-none bg-transparent text-gray-900 dark:text-white text-sm"
      />
    </div>
  );
};

export default ChipsInput;