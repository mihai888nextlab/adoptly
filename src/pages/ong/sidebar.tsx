import { useState } from "react";
import FancyButton from "@/components/fancyButton";

interface Schedual {
    name: string;
    description: string;
    logo: string;
    website: string;
    onFunctionalitySelect: (selected: string | null) => void; // Callback for parent component
}

export default function Sidebar({ name, description, logo, website, onFunctionalitySelect }: Schedual) {
    const [selectedFunctionality, setSelectedFunctionality] = useState<string | null>(null);

    const companyInfo = [
        { title: "Animals", value: "animals" },
        { title: "Evenimente", value: "evenimente" }
    ];

    const handleClick = (value: string) => {
        const newValue = selectedFunctionality === value ? null : value;
        setSelectedFunctionality(newValue);
        onFunctionalitySelect(newValue); // Send selected value to the parent
    };

    return (
        <aside className="w-72 flex-col min-h-screen bg-gray-100 relative text-black p-6 rounded-lg shadow-lg z-10 justify-between">
            {/* Upper Section */}
            <div>
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <img src={logo} alt={`${name} Logo`} className="w-40 h-40 rounded-full shadow-md" />
                </div>

                {/* Name */}
                <div className="text-center mt-4">
                    <h1 className="text-xl font-bold">{name}</h1>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-700 text-center">{description}</p>

                {/* Functionality Buttons */}
                <div className="mt-6 flex justify-center gap-2">
                    {companyInfo.map((info, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(info.value)}
                            className={`py-2 px-4 rounded-lg text-sm transition-all ${
                                selectedFunctionality === info.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {info.title}
                        </button>
                    ))}
                </div>

                {/* Website Button */}
                <div className="mt-6 text-center">
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
                    >
                        Visit Website
                    </a>
                </div>
            </div>

            {/* "Doneaza" Button Section */}
            <div className="absolute bottom-3 w-full text-center justify-center">
                {
                    selectedFunctionality !== null && (
                        <a className="decoration-none" href="ong/[id]/doneaza">
                            <FancyButton text="Doneaza" />
                        </a>
                    )
                }
            </div>
        </aside>
    );
}
