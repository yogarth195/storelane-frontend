import { useState } from "react"


const sortOptions = [
    { label: "Price: Low to High", value: { sortBy: "price", order: "asc" } },
    { label: "Price: High to Low", value: { sortBy: "price", order: "desc" } },
    { label: "Name: A to Z", value: { sortBy: "name", order: "asc" } },
    { label: "Name: Z to A", value: { sortBy: "name", order: "desc" } },
];

export const SortDropdown = ({onSortChange}) => {
    const [open, setOpen] = useState(false);
    
    const handleSelect = (option) => {
        onSortChange(option.value);
        setOpen(false);
    };



    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-gray-100 px-4 py-2 rounded border border-gray-300 hover:bg-gray-200 transition"
            >
                Sort
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                {sortOptions.map((option, idx) => (
                    <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            )}
        </div>
    )
}