// import Footer from "@/components/footer";
// import Header from "@/components/header";
// import { NextPage } from "next";
// import { useState } from "react";
// import useSWR from "swr";
// import Loading from "@/components/loading";
// import { Event } from "@/lib/models/events";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const Evenimente: NextPage = () => {
//   const [selected, setSelected] = useState<Event | null>(null);
//   const [addPetModal, setAddEventModal] = useState(false);

//   const { data, isLoading, error, mutate } = useSWR<Event[]>(
//     "/api/getEvents",
//     fetcher
//   );

//   // Ensure data is always an array
//   const events = Array.isArray(data) ? data : [];
//   console.log("Fetched Data:", data); // Debugging output

//   return (
//     <div className="w-full h-full">
//       <Header />
//       {isLoading && <Loading />}
//       {error && <p className="text-red-500">Eroare la încărcarea datelor.</p>}
//       <table className="w-full mt-5">
//         <thead className="text-gray-500 h-8 border-b-2 border-[#752CDF]">
//           <tr>
//             <th>Data</th>
//             <th>Locatie</th>
//             <th>Interval Orar</th>
//             <th>Ultima Zi de Inscriere</th>
//           </tr>
//         </thead>

//         <tbody>
//           {events.map((event, i) => (
//             <tr
//               className={
//                 (i % 2 === 0 ? "bg-white" : "bg-gray-100") +
//                 " h-16 cursor-pointer hover:bg-gray-200"
//               }
//               onClick={() => setSelected(event)}
//               key={event.id}
//             >
//               <td className="text-center">
//                 {event.data?.an}/{event.data?.luna}/{event.data?.zi}
//               </td>
//               <td className="text-center">{event.locatie}</td>
//               <td className="text-center">
//                 {event.ora_inceput}-{event.ora_sfarsit}
//               </td>
//               <td className="text-center">
//                 {event.ultima_zi?.an}/{event.ultima_zi?.luna}/
//                 {event.ultima_zi?.zi}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Footer />
//     </div>
//   );
// };

// export default Evenimente;

import Footer from "@/components/footer";
import Header from "@/components/header";
import { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/loading";
import { Event } from "@/lib/models/events";
import dayjs from "dayjs"; // Install with: npm install dayjs

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Evenimente: NextPage = () => {
  const [selected, setSelected] = useState<Event | null>(null);

  const { data, isLoading, error } = useSWR<Event[]>("/api/getEvents", fetcher);
  const events = Array.isArray(data) ? data : [];

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-[#752CDF] mb-6">
          Evenimente Viitoare
        </h1>

        {isLoading && <Loading />}
        {error && (
          <p className="text-red-500 text-center">
            Eroare la încărcarea datelor.
          </p>
        )}

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
              {events.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-gray-500">
                    Nu există evenimente disponibile.
                  </td>
                </tr>
              ) : (
                events.map((event, i) => (
                  <tr
                    key={event.id}
                    className={`h-14 cursor-pointer ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200 transition-all duration-200`}
                    onClick={() => setSelected(event)}
                  >
                    <td className="text-center font-medium">
                      {dayjs(
                        `${event.data?.an}-${event.data?.luna}-${event.data?.zi}`
                      ).format("DD MMM YYYY")}
                    </td>
                    <td className="text-center">{event.locatie}</td>
                    <td className="text-center">
                      {event.ora_inceput} - {event.ora_sfarsit}
                    </td>
                    <td className="text-center text-red-500 font-medium">
                      {dayjs(
                        `${event.ultima_zi?.an}-${event.ultima_zi?.luna}-${event.ultima_zi?.zi}`
                      ).format("DD MMM YYYY")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Evenimente;
