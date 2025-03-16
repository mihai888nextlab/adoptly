import { NextPageWithLayout } from "../_app";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/loading";
import { Event } from "@/lib/models/events";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Evenimente: NextPageWithLayout = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const [addPetModal, setAddPetModal] = useState(false);

  const { data, isLoading, error, mutate } = useSWR<Event[]>(
    "/api/getEvents",
    fetcher
  );

  // Ensure data is always an array
  const events = Array.isArray(data) ? data : [];
  console.log("Fetched Data:", data); // Debugging output

  return (
    <div className="w-full h-full">
      {isLoading && <Loading />}
      {error && <p className="text-red-500">Eroare la încărcarea datelor.</p>}
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
          {events.map((event, i) => (
            <tr
              className={
                (i % 2 === 0 ? "bg-white" : "bg-gray-100") +
                " h-16 cursor-pointer hover:bg-gray-200"
              }
              onClick={() => setSelected(event)}
              key={event.ora_inceput}
            >
              <td className="text-center">{event.ora_inceput}</td>
              <td className="text-center">{event.ora_inceput}</td>
              <td className="text-center">{event.ora_inceput}</td>
              <td className="text-center">
                {event.ora_inceput}/{event.ora_sfarsit}/{event.ora_sfarsit}
              </td>
              <td className="text-center">{event.ora_inceput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Evenimente.getLayout = "dashboard";

export default Evenimente;
