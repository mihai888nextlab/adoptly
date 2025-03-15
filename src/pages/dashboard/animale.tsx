import AddPetModal from "@/components/modals/addPetModal";
import { NextPageWithLayout } from "../_app";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Animale: NextPageWithLayout = () => {
  const [selected, setSelected] = useState("");
  const [addPetModal, setAddPetModal] = useState(false);

  const { data, isLoading, error } = useSWR("/api/getPetsByUploader", fetcher);

  const data2 = [
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Trex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
    {
      nume: "Rex",
      specie: "Caine",
      rasa: "Ciobanesc German",
      varsta: { ani: 2, luni: 3 },
      gen: "Masculin",
    },
  ];

  return (
    <div className="w-full h-full">
      {addPetModal && <AddPetModal setAddPetModal={setAddPetModal} />}
      <div className="w-full h-full bg-white rounded-xl shadow-sm p-7">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold">Lista animale</h2>
          <button
            className="bg-[#752CDF] text-white rounded-lg px-5 py-3"
            onClick={() => setAddPetModal(true)}
          >
            Adauga animal
          </button>
        </div>
        {/* 
        <th>Greutate (kg)</th>
            <th>Culoare</th>
            <th>Data salvarii</th>
            <th>Stare de sanatate</th>
            <th>Sterilizat</th>
            <th>Disponibil pentru adopție</th> */}

        <table className="w-full mt-5">
          <thead className="text-gray-500 h-8 border-b-2 border-[#752CDF]">
            <tr>
              <th>Nume</th>
              <th>Specie</th>
              <th>Rasa</th>
              <th>Varsta</th>
              <th>Gen</th>
            </tr>
          </thead>

          <tbody>
            {data.map((animal, i) => (
              <tr
                className={
                  (i % 2 == 0 ? "bg-white" : "bg-gray-100") +
                  " h-16 cursor-pointer hover:bg-gray-200"
                }
                key={animal.nume}
              >
                <td className="text-center">{animal.nume}</td>
                <td className="text-center">{animal.specie}</td>
                <td className="text-center">{animal.rasa}</td>
                <td className="text-center">
                  {animal.varsta.ani} ani si {animal.varsta.luni} luni
                </td>
                <td className="text-center">{animal.gen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Animale.getLayout = "dashboard";

export default Animale;
