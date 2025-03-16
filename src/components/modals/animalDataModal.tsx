import { Pet } from "@/lib/models/pet";
import axios from "axios";
import { toast } from "react-toastify";

export default function AnimalDataModal({
  animal,
  setAnimalDataModal,
}: {
  animal: Pet | null;
  setAnimalDataModal: (e: Pet | null) => void;
}) {


  const handleDelete = async () => {
  try {
    const response = await axios.post("/api/delete", { id: animal?._id });
    if (response.status === 200) {
      toast.success("Animal deleted successfully");
      setAnimalDataModal(null);
      // Consider refreshing the data list here
    } else {
      throw new Error("Failed to delete animal");
    }
  } catch (error) {
    console.error("Error deleting animal:", error);
    toast.error("Failed to delete animal. Please try again.");
  }
};

const handleAvailabilityToggle = async () => {
  try {
    const response = await axios.post("/api/updatePetNo", { id: animal?._id });
    if (response.status === 200) {
      toast.success("Availability updated successfully");
      setAnimalDataModal(null);
      // Consider refreshing the data list here
    } else {
      throw new Error("Failed to update availability");
    }
  } catch (error) {
    console.error("Error updating availability:", error);
    toast.error("Failed to update availability. Please try again.");
  }
};


  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-sm w-1/2 h-[80%] overflow-y-auto">
        <h1 className="m-0 text-center">{animal?.nume}</h1>
        <div
          className="w-[40%] h-96 rounded-lg bg-cover bg-center m-auto mt-5"
          style={{ backgroundImage: "url('" + animal?.image + "')" }}
        ></div>
        <div className="flex justify-between mt-5">
          <div>
            <h2 className="font-semibold text-2xl mb-5">Informatii generale</h2>
            <p>
              <span className="font-semibold">Specie:</span> {animal?.specie}
            </p>
            <p>
              <span className="font-semibold">Rasa:</span> {animal?.rasa}
            </p>
            <p>
              <span className="font-semibold">Varsta:</span> {animal?.varsta.ani} ani {animal?.varsta.luni} luni
            </p>
            <p>
              <span className="font-semibold">Gen:</span> {animal?.gen}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-2xl mb-5">Detalii</h2>
            <p>
              <span className="font-semibold">Greutate:</span> {animal?.greutate} kg
            </p>
            <p>
              <span className="font-semibold">Culoare:</span> {animal?.culoare}
            </p>
            <p>
              <span className="font-semibold">Data salvarii:</span> {animal?.dataSalvarii}
            </p>
            <p>
              <span className="font-semibold">Stare de sanatate:</span> {animal?.stareDeSanatate}
            </p>
            <p>
              <span className="font-semibold">Sterilizat:</span> {animal?.sterilizat}
            </p>
            <p>
              <span className="font-semibold">Disponibil pentru adopție:</span> {animal?.disponibil}
            </p>
            <p>
              <span className="font-semibold">Descriere: </span>
              {animal?.descriere}
            </p>
          </div>
        </div>
        <button
          className="p-3 bg-red-500 rounded-lg text-white"
          onClick={() => setAnimalDataModal(null)}
        >
          Close
        </button>
        <button
          className="p-3 bg-red-500 rounded-lg text-white ml-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="p-3 bg-blue-500 rounded-lg text-white ml-2"
          onClick={handleAvailabilityToggle}
        >
          Schimba la disponibil
        </button>
      </div>
    </div>
  );
}
