import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "./sidebar";
import { info } from "console";
import FancyButton from "@/components/fancyButton";
import { User } from "@/lib/models/user";

interface Shelter {
  _id: string;
  name: string;
  description: string;
  image?: string;
  website?: string;
}

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

export default function OngDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [ongs, setOngs] = useState<Shelter[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedFunctionality, setSelectedFunctionality] = useState<
    string | null
  >(null);
  const [petsForThisShelter, setPetsForThisShelter] = useState<Pet[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

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
      .then((data: Pet[]) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  useEffect(() => {
    // const findPet = pets.find((element) => element.addedBy === selectedShelter);
    // setPetsForThisShelter(findPet? [findPet]: []);
  }, [petsForThisShelter]);

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
              {pets.length === 0 && (<p>Momentan toate animalele au un camin</p>)}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-6">
                {pets
                  .filter((pet) => pet.addedBy === id) // Filter only matching pets
                  .map((pet) => (
                    <div className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
>
                      <img src={pet.image} alt={pet.nume} className="w-32 h-32 object-cover rounded-md" />
                      <div className="mt-2 text-center">
                        <h3 className="text-xl font-bold">Nume: {pet.nume}</h3>
                        <p className="text-gray-600">Specie : {pet.specie}</p>
                        <p className="text-gray-600">Varsta : {pet.varsta.ani} ani si {pet.varsta.luni} luni</p>
                      </div>
                    </div>
                  ))}
              </div>

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
              <h2 className="text-3xl font-bold text-gray-800">
                Bine ai venit la {selectedShelter.name}!
              </h2>
              <p className="mt-4 text-lg text-gray-700 max-w-md">
                Aceasta este pagina de prezentare, iar echipa noastră face tot
                posibilul să ajute comunitatea. Dar tu cum poți contribui?
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
