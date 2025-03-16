import { useState } from "react";
import FancyButton from "@/components/fancyButton";
import MakeAReservationModal from "@/components/modals/makeAResarvation"; 
import { Pet } from "@/lib/models/pet";

interface Petl {
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

interface ClickedPetProps {
    pet: Petl;
    onClose: () => void;
}

const ClickedPet: React.FC<ClickedPetProps> = ({ pet, onClose }) => {
    const [disponibil, setDisponibil] = useState(pet.disponibil);
    const [showReservationModal, setShowReservationModal] = useState(false);

    const handleMakeAppointment = () => {
        setShowReservationModal(true);  
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-8 shadow-lg relative overflow-hidden">
                    

                    <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
                        <div className="flex-shrink-0">
                            <img
                                src={pet.image}
                                alt={pet.nume}
                                className="w-56 h-56 object-cover rounded-lg shadow-md"
                            />
                        </div>

                        <div className="flex-1 space-y-4 text-left">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <p className="text-xl font-semibold text-gray-800">{pet.nume}</p>
                                    <p className="text-lg text-gray-700"><strong>Specie:</strong> {pet.specie}</p>
                                    <p className="text-lg text-gray-700"><strong>Rasa:</strong> {pet.rasa}</p>
                                    <p className="text-lg text-gray-700"><strong>Vârsta:</strong> {pet.varsta.ani} ani, {pet.varsta.luni} luni</p>
                                    <p className="text-lg text-gray-700"><strong>Gen:</strong> {pet.gen}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg text-gray-700"><strong>Greutate:</strong> {pet.greutate} kg</p>
                                    <p className="text-lg text-gray-700"><strong>Culoare:</strong> {pet.culoare}</p>
                                    <p className="text-lg text-gray-700"><strong>Data Salvării:</strong> {pet.dataSalvarii}</p>
                                    <p className="text-lg text-gray-700"><strong>Stare de sănătate:</strong> {pet.stareDeSanatate}</p>
                                    <p className="text-lg text-gray-700"><strong>Sterilizat:</strong> {pet.sterilizat}</p>
                                    <p className="text-lg text-gray-700"><strong>Disponibil pentru adopție:</strong> {disponibil}</p>
                                </div>
                            </div>

                            <p className="text-lg text-gray-700 mb-4"><strong>Descriere:</strong> {pet.descriere}</p>

                            <div className="flex justify-between space-x-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Închide
                                </button>
                                <FancyButton
                                    text="Programează o întâlnire"
                                    onClick={handleMakeAppointment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation Modal */}
            {showReservationModal && (
                <MakeAReservationModal
                    petName={pet.nume}
                    onClose={() => setShowReservationModal(false)}
                />
            )}
        </>
    );
};

export default ClickedPet;
