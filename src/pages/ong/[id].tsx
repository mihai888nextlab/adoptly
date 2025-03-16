import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "./sidebar";
import FancyButton from "@/components/fancyButton";
import ClickedPet from "@/components/clickedPet";
import dayjs from "dayjs";
import Loading from "@/components/loading";


interface Shelter {
  _id: string;
  name: string;
  descriere: string;
  image?: string;
  website?: string;
}

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

interface Evenimente {
  data_an: number;
  data_luna: number;
  data_zi: number;
  ora_inceput: string;
  ora_sfarsit: string;
  locatie: string;
  ultima_zi_an: number;
  ultima_zi_luna: number;
  ultima_zi: number;
  imageUrl: string;
  addedBy: string;
  shelter: string;
}

export default function OngDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [ongs, setOngs] = useState<Shelter[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedFunctionality, setSelectedFunctionality] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvenimente] = useState<Evenimente[]>([]);
  
  useEffect(() => {
    fetch("/api/getEvents")
      .then(response => response.text()) // Inspect response
      .then(text => {
        console.log("Raw response:", text); // Check if it's HTML or JSON
        return JSON.parse(text); // Parse the JSON if valid
      })
      .then((data: Evenimente[]) => setEvenimente(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  

  useEffect(() => {
    fetch("/api/getShelters")
      .then((response) => response.json())
      .then((data: Shelter[]) => setOngs(data))
      .catch((error) => console.error("Error fetching NGOs:", error));
  }, []);

  useEffect(() => {
    if (id && ongs.length > 0) {
      const foundShelter = ongs.find((element) => element._id === id);
      setSelectedShelter(foundShelter || null);
    }
  }, [id, ongs]);

  useEffect(() => {
    fetch("/api/getPet")
      .then((response) => response.json())
      .then((data: Pet[]) => setPets(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets.");
      });
  }, []);

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
          descriere={selectedShelter.descriere}
          logo={selectedShelter.image || "/default-logo.png"}
          website={selectedShelter.website || "#"}
          onFunctionalitySelect={setSelectedFunctionality}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold">{selectedShelter.name}</h1>
          {/* <p className="text-lg mt-4">{selectedShelter.descriere}</p> */}

          {/* Show content based on selected functionality */}
          {selectedFunctionality === "animals" && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-semibold">Animals Information</h2>
              {error && <p className="text-red-500">{error}</p>}
              {pets.length === 0 && !error && <p>Momentan toate animalele au un cămin.</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-6">
                {pets
                  .filter((pet) => pet.addedBy === selectedShelter._id)
                  .map((pet) => (
                    <div
                      key={pet.nume}
                      onClick={() => setSelectedPet(pet)}
                      className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      <img src={pet.image} alt={pet.nume} className="w-32 h-32 object-cover rounded-md" />
                      <div className="mt-2 text-center">
                        <h3 className="text-xl font-bold">Nume: {pet.nume}</h3>
                        <p className="text-gray-600">Specie: {pet.specie}</p>
                        <p className="text-gray-600">Vârstă: {pet.varsta.ani} ani și {pet.varsta.luni} luni</p>
                      </div>
                    </div>
                  ))}
              </div>
              {selectedPet && <ClickedPet pet={selectedPet} onClose={() => setSelectedPet(null)} />}
            </div>
          )}

          {selectedFunctionality === "evenimente" && (
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#752CDF] text-white text-lg h-12">
                            <th className="p-3">Data</th>
                            <th className="p-3">Locație</th>
                            <th className="p-3">Interval Orar</th>
                            <th className="p-3">Ultima Zi de Înscriere</th>
                          </tr>
                        </thead>
            
                        <tbody>
                          {events.length === 0  ? (
                            <tr>
                              <td colSpan={4} className="text-center py-5 text-gray-500">
                                Nu există evenimente disponibile.
                              </td>
                            </tr>
                          ) : (
                            events.map((event, i) => (
                              <tr
                                className={`h-14 cursor-pointer ${
                                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-200 transition-all duration-200`}
                                
                              >
                                <td className="text-center font-medium">
                                  {dayjs(
                                    `${event.data_an}-${event.data_luna}-${event.data_zi}`
                                  ).format("DD MMM YYYY")}
                                </td>
                                <td className="text-center">{event.locatie}</td>
                                <td className="text-center">
                                  {event.ora_inceput} - {event.ora_sfarsit}
                                </td>
                                <td className="text-center text-red-500 font-medium">
                                  {dayjs(
                                    `${event.ultima_zi_an}-${event.ultima_zi_luna}-${event.ultima_zi?.zi}`
                                  ).format("DD MMM YYYY")}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
          )}

          {selectedFunctionality === null && (
            <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Bine ai venit la {selectedShelter.name}!
              </h2>
              <p className="mt-4 text-lg text-gray-700 max-w-md">
                Aceasta este pagina de prezentare, iar echipa noastră face tot
                posibilul să ajute comunitatea. Dar tu cum poți contribui?
              </p>
              <div className="mt-6 flex justify-center">
                <a href="/donate" className="text-decoration-none">
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
