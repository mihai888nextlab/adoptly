import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "./sidebar";
import { info } from "console";
import FancyButton from "@/components/fancyButton";

interface Shelter {
    name: string;
    description: string;
    image?: string;
    website?: string;
}

export default function OngDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [ongs, setOngs] = useState<Shelter[]>([]);
    const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
    const [selectedFunctionality, setSelectedFunctionality] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/getShelters")
            .then((response) => response.json()) 
            .then((data: Shelter[]) => setOngs(data))
            .catch((error) => console.error("Error fetching NGOs:", error));
    }, []);

    useEffect(() => {
        if (id && ongs.length > 0) {
            const foundShelter = ongs.find((element) => element.name === id);
            setSelectedShelter(foundShelter || null);
        }
    }, [id, ongs]);

    if (!selectedShelter) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-xl text-gray-500">Încărcăm datele...</p>
            </div>
        );
    }

    return (
        <main className="flex-grow gap-3">
            <Header />
            <div className="flex flex-col md:flex-row">
                {/* Sidebar with shelter details */}
                <Sidebar 
                    name={selectedShelter.name} 
                    description={selectedShelter.description} 
                    logo={selectedShelter.image || "/default-logo.png"} 
                    website={selectedShelter.website || "#"}
                    onFunctionalitySelect={setSelectedFunctionality} // Pass the state updater
                />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold">{selectedShelter.name}</h1>
                    <p className="text-lg mt-4">{selectedShelter.description}</p>

                    {/* Show content based on selected functionality */}
                    {selectedFunctionality === "animals" && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <h2 className="text-2xl font-semibold">Animals Information</h2>
                            <p>Empty for now</p>
                        </div>
                    )}

                    {selectedFunctionality === "evenimente" && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <h2 className="text-2xl font-semibold">Evenimente Information</h2>
                            <p>Empty for now</p>
                        </div>
                    )}

                    {selectedFunctionality === null && (
                        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded-lg shadow-lg p-6 text-center">
                            <h2 className="text-3xl font-bold text-gray-800">Bine ai venit la {selectedShelter.name}!</h2>
                            <p className="mt-4 text-lg text-gray-700 max-w-md">
                                Aceasta este pagina de prezentare, iar echipa noastră face tot posibilul să ajute comunitatea.
                                Dar tu cum poți contribui?
                            </p>
                            <div className="mt-6">
                                <a href="/donate">
                                    <FancyButton text="Donează" />
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </main>
    );
}
