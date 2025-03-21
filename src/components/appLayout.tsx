import { StateProvider, useSharedState } from "@/hooks/stateContext";
import { ReactNode, useState } from "react";
import Loading from "./loading";
import { MdDashboard } from "react-icons/md";
import { FaUserShield, FaPlus, FaDog } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import { Playwrite_HU, Poppins } from "next/font/google";
import { Event } from "@/lib/models/events";
import AddEventModal from "./modals/addEventModal";
import useSWR from "swr";
import { NextPageWithLayout } from "@/pages/_app";

const font = Playwrite_HU({});
const font2 = Poppins({ weight: "400", subsets: ["latin"] });
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Eveniment: NextPageWithLayout = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const [addPetModal, setAddPetModal] = useState(false);

  const { data, isLoading, error, mutate } = useSWR<Event[]>(
    "/api/getEventsByUploader",
    fetcher
  );

  const pets = Array.isArray(data) ? data : [];
  console.log("Fetched Data:", data);

  return null; // Placeholder to prevent an empty component error
};

export default function AppLayout({ children }: { children: ReactNode }) {
  const [addEventModal, setAddEventModal] = useState(false);
  const sharedState = useSharedState();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
    { name: "Animale", path: "/dashboard/animale", icon: FaDog },
    // { name: "Settings", path: "/app/settings", icon: IoIosSettings },
    { name: "Evenimente", path: "./evenimente", icon: IoIosSettings },
  ];

  return (
    <>
      {sharedState.loading && <Loading />}
      {addEventModal && (
        <AddEventModal setAddEventModal={setAddEventModal} mutate={() => {}} />
      )}
      <div className="w-full min-h-screen grid grid-rows-[5rem_1fr]">
        <header className="h-20 w-full z-10 flex">
          <div className="h-full flex items-center justify-center cursor-pointer w-[20%]">
            <img src="../logo.png" alt="" className="h-full" />
            <h1 className={font.className + " text-2xl"}>Adoptly</h1>
          </div>
          <div className="h-full w-[80%] flex justify-between items-center px-10">
            <div className="flex items-center">
              <IoSearch className="text-gray-400 h-7 w-7 mr-5" />
              <input
                type="text"
                className="border-0 active:border-0 focus-visible::border-0"
                placeholder="Search ..."
              />
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/dashboard/profile")}
            >
              <img
                src="../placeholder_pfp.png"
                className="h-10 rounded-full border-4 mr-3"
                alt=""
              />
              <h2 className="text-xl font-semibold cursor-pointer">
                {sharedState.user && sharedState.user.name}
              </h2>
            </div>
          </div>
        </header>
        <main className={font2.className + " w-full grid grid-cols-[20%_80%]"}>
          <menu className="z-20 flex flex-col items-center">
            <div className="w-[80%]">
              <button
                className="bg-[#752CDF] w-full my-10 py-5 rounded-xl text-white font-semibold flex items-center justify-center"
                onClick={() => setAddEventModal(true)}
              >
                <FaPlus className="mr-5" />
                Adauga un eveniment
              </button>
              {menu.map((item) => (
                <div
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={
                    "h-10 px-3 py-5 my-5 flex items-center cursor-pointer text-gray-500 hover:text-black rounded-md text-xl" +
                    (router.pathname === item.path
                      ? " text-black font-semibold"
                      : "")
                  }
                >
                  <item.icon
                    className={
                      "w-7 h-7 mr-5" +
                      (router.pathname === item.path ? " text-[#752CDF]" : "")
                    }
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </menu>
          <div className="bg-[#F5F6FA] p-10">{children}</div>
        </main>
      </div>
    </>
  );

  
}
