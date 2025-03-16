import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import ClickedPet from "@/components/clickedPet"; // Import the popup component

interface Pet {
    _id: string; 
    nume: string;
    specie: string;
    rasa: string;
    varsta: { ani: number; luni: number };
    gen: string;
    greutate: number;
    culoare: string;
    dataSalvarii: string;
    stareDeSanatate: string;
    sterilizat: string;
    disponibil: string;
    descriere: string;
    addedBy: string;
    image: string;
}

export default function AdoptaPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // Track selected pet

    useEffect(() => {
        fetch('/api/getPet')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPets(data))
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
    }, []);

    const filteredPets = searchTerm
        ? pets.filter((pet) =>
            pet.descriere && pet.descriere.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : pets;

    const handlePetClick = (pet: Pet) => {
        setSelectedPet(pet); // Set the selected pet when clicked
    };

    const handleClosePopup = () => {
        setSelectedPet(null); // Close the popup by resetting selected pet
    };

    return (
        <div>
            <Header />
            <main className="p-4">
                {/* Search bar */}
                <div className="flex flex-col items-center justify-center h-[30vh] bg-gray-100 rounded-lg shadow-lg p-2 text-center">
                    <input
                        type="text"
                        placeholder="Căutare după descriere..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Pets list in grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPets.length > 0 ? (
                        filteredPets.map((pet) => (
                            <div
                                key={pet.nume}
                                onClick={() => handlePetClick(pet)} // Handle click on a pet
                                className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <img src={pet.image} alt={pet.nume} className="w-32 h-32 object-cover rounded-md" />
                                <div className="mt-2 text-center">
                                    <h3 className="text-xl font-bold">Nume: {pet.nume}</h3>
                                    <p className="text-gray-600">Specie: {pet.specie}</p>
                                    <p className="text-gray-600">Varsta: {pet.varsta.ani} ani si {pet.varsta.luni} luni</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">Nu există animale care se potrivesc criteriilor de căutare.</p>
                    )}
                </div>
            </main>

            {/* Show popup if a pet is selected */}
            {selectedPet && <ClickedPet pet={selectedPet} onClose={handleClosePopup} />}

            <Footer />
        </div>
    );
}
