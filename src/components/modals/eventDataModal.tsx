import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";

interface Event {
  _id: string;
  data: { an: number; luna: number; zi: number };
  ora_inceput: number;
  ora_sfarsit: number;
  locatie: string;
  ultima_zi: { an: number; luna: number; zi: number };
  image: string;
  shelter: string;
}

export default function EventDataModal({
  event,
  onClose, // Changed from setEventDataModal to onClose
}: {
  event: Event | null;
  onClose: () => void; // New prop for closing modal
}) {
  
  const formatDate = (dateObj?: { an: number; luna: number; zi: number }) => {
    if (!dateObj) return "N/A";
    return dayjs(`${dateObj.an}-${dateObj.luna}-${dateObj.zi}`).format("DD/MM/YYYY");
  };

  const calculateDaysRemaining = (dateObj?: { an: number; luna: number; zi: number }) => {
    if (!dateObj) return "Date not available";
    const today = dayjs();
    const eventDate = dayjs(`${dateObj.an}-${dateObj.luna}-${dateObj.zi}`);
    const daysRemaining = eventDate.diff(today, "day");
    return daysRemaining >= 0 ? `${daysRemaining} days remaining` : "Event has passed";
  };

  const handleDelete = async () => {
    if (!event?._id) return;
    try {
      const response = await axios.post("/api/deleteEvent", { id: event._id });
      if (response.status === 200) {
        toast.success("Event deleted successfully");
        onClose(); // Close modal after success
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const handleStatusToggle = async () => {
    if (!event?._id) return;
    try {
      const response = await axios.post("/api/updateEventStatus", { id: event._id });
      if (response.status === 200) {
        toast.success("Event status updated successfully");
        onClose(); // Close modal after success
      } else {
        throw new Error("Failed to update event status");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
      toast.error("Failed to update event status. Please try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-sm w-1/2 h-[80%] overflow-y-auto">
        <h1 className="m-0 text-center">{event?.shelter || "Unknown Shelter"}</h1>
        <div
          className="w-[40%] h-96 rounded-lg bg-cover bg-center m-auto mt-5"
          style={{ backgroundImage: `url('${event?.image || ""}')` }}
        ></div>
        <div className="flex justify-between mt-5">
          <div>
            <h2 className="font-semibold text-2xl mb-5">Event Details</h2>
            <p>
              <span className="font-semibold">Date:</span> {formatDate(event?.data)}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {event?.ora_inceput ?? "N/A"} - {event?.ora_sfarsit ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {event?.locatie || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Last Day to Attend:</span> {formatDate(event?.ultima_zi)}
            </p>
            <p>
              <span className="font-semibold">Days Remaining:</span> {calculateDaysRemaining(event?.data)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
         
          <button
            className="p-3 bg-gray-500 rounded-lg text-white"
            onClick={onClose} // Updated for consistency
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
