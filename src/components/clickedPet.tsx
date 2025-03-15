import { useState } from "react";

interface Pet {
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

interface ClickedPetProps {
    pet: Pet;
    onClose: () => void; // Function to close the popup
}

const ClickedPet: React.FC<ClickedPetProps> = ({ pet, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-8 shadow-lg relative overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white text-2xl hover:bg-red-600 transition duration-300"
                >
                    ×
                </button>

                {/* Pet details */}
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    <img
                        src={pet.image}
                        alt={pet.nume}
                        className="w-56 h-56 object-cover rounded-lg shadow-md"
                    />
                    <div className="text-left space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">{pet.nume}</h2>
                        <p className="text-lg text-gray-700"><strong>Specie:</strong> {pet.specie}</p>
                        <p className="text-lg text-gray-700"><strong>Rasa:</strong> {pet.rasa}</p>
                        <p className="text-lg text-gray-700"><strong>Vârsta:</strong> {pet.varsta.ani} ani, {pet.varsta.luni} luni</p>
                        <p className="text-lg text-gray-700"><strong>Gen:</strong> {pet.gen}</p>
                        <p className="text-lg text-gray-700"><strong>Greutate:</strong> {pet.greutate} kg</p>
                        <p className="text-lg text-gray-700"><strong>Culoare:</strong> {pet.culoare}</p>
                        <p className="text-lg text-gray-700"><strong>Data Salvării:</strong> {pet.dataSalvarii}</p>
                        <p className="text-lg text-gray-700"><strong>Stare de sănătate:</strong> {pet.stareDeSanatate}</p>
                        <p className="text-lg text-gray-700"><strong>Sterilizat:</strong> {pet.sterilizat}</p>
                        <p className="text-lg text-gray-700"><strong>Disponibil:</strong> {pet.disponibil}</p>
                        <p className="text-lg text-gray-700 mb-4"><strong>Descriere:</strong> {pet.descriere}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClickedPet;
