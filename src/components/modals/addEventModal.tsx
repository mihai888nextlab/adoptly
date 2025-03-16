import { useSharedState } from "@/hooks/stateContext";
import { useState } from "react";

export default function AddEventModal({
  setAddEventModal,
  mutate,
}: {
  setAddEventModal: (e: boolean) => void;
  mutate: () => void;
}) {
  const sharedState = useSharedState();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Pentru preview
  };

  const handleUpload = async () => {
    if (!file) return alert("Selectează un fișier!");

    setUploading(true);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(",")[1]; // Elimină prefixul base64
      if (!base64) {
        setUploading(false);
        return alert("Eroare la citirea fișierului!");
      }

      const res = await fetch("/api/fileUploadSystem/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: base64,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const data = await res.json();
      setUploading(false);

      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        alert("Eroare la upload: " + data.error);
      }
    };
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data_an = formData.get("data_an") as string;
    const data_luna = formData.get("data_luna") as string;
    const data_zi = formData.get("data_zi") as string;
    const ora_inceput = formData.get("ora_inceput") as string;
    const ora_sfarsit = formData.get("ora_sfarsit") as string;
    const locatie = formData.get("locatie") as string;
    const ultima_zi_an = formData.get("ultima_zi_an") as string;
    const ultima_zi_luna = formData.get("ultima_zi_luna") as string;
    const ultima_zi = formData.get("ultima_zi") as string;
    const imageUrl = formData.get("image") as string;
    const shelter = formData.get("shelter") as string;

    const res = await fetch("/api/addPet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data_an,
        data_luna,
        data_zi,
        ora_inceput,
        ora_sfarsit,
        locatie,
        ultima_zi_an,
        ultima_zi_luna,
        ultima_zi,
        shelter,
        imageUrl: uploadedUrl,
        addedBy: sharedState.user?._id,
      }),
    });

    if (res.ok) {
      setAddEventModal(false);
      mutate();
    } else {
      alert("Eroare la adaugare!");
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-sm w-1/2 h-[80%] overflow-y-auto">
        <h1 className="font-bold m-0 mb-2">Adauga un eveniment</h1>
        <h2 className="font-semibold text-xl">Informatii generale</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleFormSubmit}>
          <label>Adapost</label>
          <input
            type="text"
            name="shelter"
            placeholder="Introdu numele adapostului"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="locatie"
            placeholder="Introdu locatia adapostului"
            className="border rounded p-2"
          />
          <label>Data desfasurarii evenimentului</label>
          <div className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr_1fr] grid-rows-1">
            <input
              type="number"
              name="data_an"
              placeholder="Introdu anul"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Anul
            </div>
            <input
              type="number"
              name="data_luna"
              placeholder="Introdu luna"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Luna
            </div>
            <input
              type="number"
              name="data_zi"
              placeholder="Introdu ziua"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Ziua
            </div>
          </div>
          <h2 className="font-semibold text-xl">Detalii</h2>
          <label>Ora inceperii evenimentului</label>
          <input
            type="number"
            name="ora_inceput"
            placeholder="Ora inceperii evenimentul"
            className="border rounded p-2"
          />
          <label>Ora sfarsirii evenimentului</label>
          <input
            type="number"
            name="ora_sfarsit"
            placeholder="Ora terminarii evenimentul"
            className="border rounded p-2"
          />
          <label>Ultima zi pentru inscriere</label>
          <div className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr_1fr] grid-rows-1">
            <input
              type="number"
              name="ultima_zi_an"
              placeholder="Introdu anul"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Anul
            </div>
            <input
              type="number"
              name="ultima_zi_luna"
              placeholder="Introdu luna"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Luna
            </div>
            <input
              type="number"
              name="ultima_zi"
              placeholder="Introdu ziua"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Ziua
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border p-2"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          )}

          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploadedUrl && <p className="text-green-500">✅ Upload reușit!</p>}

          <button className="bg-blue-500 text-white rounded-lg p-5 mt-4">
            Adauga
          </button>
        </form>
      </div>
    </div>
  );
}
