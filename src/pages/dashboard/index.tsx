import { useSharedState } from "@/hooks/stateContext";
import { NextPageWithLayout } from "../_app";
import { useState, useEffect } from "react";

interface Pet {
  id: string;
  nume: string;
  specie: string;
  rasa: string;
  varsta: { ani: number; luni: number };
  gen: string;
  greutate: number;
  culoare: string;
  dataSalvarii: string;
  stareDeSanatate: string;
}

const Dashboard: NextPageWithLayout = () => {
  const sharedState = useSharedState();
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/getPetsByUploader")
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            // Instead of throwing an error, resolve with an empty array
            return [];
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        setAnimals(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setError("Failed to load animals.");
      });
  }, []);
  
  

  return (
    <div>
      <div className="bg-white w-96 p-5 rounded-xl shadow-sm">
        <h1 className="font-bold m-0">{animals.length}</h1>
        <p className="text-gray-500 font-bold text-xl m-0">Total animals</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <h1>{sharedState?.user?.name ?? "Guest"}</h1>
    </div>
  );
};

Dashboard.getLayout = "dashboard";

export default Dashboard;