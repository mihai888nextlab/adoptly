import { useSharedState } from "@/hooks/stateContext";
import { useState } from "react";

export default function AddPetModal({
  setAddPetModal,
}: {
  setAddPetModal: (e: boolean) => void;
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
    const nume = formData.get("nume") as string;
    const specie = formData.get("specie") as string;
    const rasa = formData.get("rasa") as string;
    const varstaAni = formData.get("varstaAni") as string;
    const varstaLuni = formData.get("varstaLuni") as string;
    const gen = formData.get("gen") as string;
    const greutate = formData.get("greutate") as string;
    const culoare = formData.get("culoare") as string;
    const dataSalvarii = formData.get("dataSalvarii") as string;
    const stareSanatate = formData.get("stareSanatate") as string;
    const sterilizat = formData.get("sterilizat") as string;
    const disponibilAdoptie = formData.get("disponibilAdoptie") as string;
    const descriere = formData.get("descriere") as string;

    const res = await fetch("/api/addPet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nume,
        specie,
        rasa,
        varstaAni,
        varstaLuni,
        gen,
        greutate,
        culoare,
        dataSalvarii,
        stareSanatate,
        sterilizat,
        disponibilAdoptie,
        descriere,
        imageUrl: uploadedUrl,
        addedBy: sharedState.user?._id,
      }),
    });

    if (res.ok) {
      setAddPetModal(false);
    } else {
      alert("Eroare la adaugare!");
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-sm w-1/2 h-[80%] overflow-y-auto">
        <h1 className="font-bold m-0 mb-2">Adauga un animal</h1>
        <h2 className="font-semibold text-xl">Informatii generale</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleFormSubmit}>
          <label>Nume</label>
          <input
            type="text"
            name="nume"
            placeholder="Introdu nume"
            className="border rounded p-2"
          />
          <label>Specie</label>
          <select className="border rounded p-2" name="specie">
            <option value="Caine">Caine</option>
            <option value="Pisica">Pisica</option>
            <option value="Iepure">Iepure</option>
            <option value="Hamster">Hamster</option>
            <option value="Porcușor de Guineea">Porcușor de Guineea</option>
            <option value="Șinșila">Șinșila</option>
            <option value="Papagal">Papagal</option>
            <option value="Porumbel">Porumbel</option>
            <option value="Soparla">Soparla</option>
            <option value="Sarpe">Sarpe</option>
          </select>
          <label>Rasa</label>
          <input
            type="text"
            name="rasa"
            placeholder="Introdu rasa"
            className="border rounded p-2"
          />
          <label>Varsta</label>
          <div className="grid grid-cols-[3fr_2fr_3fr_2fr] grid-rows-1">
            <input
              type="number"
              name="varstaAni"
              placeholder="Introdu varsta (ani)"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Ani
            </div>
            <input
              type="number"
              name="varstaLuni"
              placeholder="Introdu varsta (luni)"
              className="border rounded p-2"
            />
            <div className="bg-gray-300 text-black flex items-center justify-center">
              Luni
            </div>
          </div>
          <label>Gen</label>
          <select className="border rounded p-2" name="gen">
            <option value="Masculin">Masculin</option>
            <option value="Feminin">Feminin</option>
          </select>

          <h2 className="font-semibold text-xl">Detalii</h2>
          <label>Greutate (kg)</label>
          <input
            type="number"
            name="greutate"
            placeholder="Introdu greutate"
            className="border rounded p-2"
          />
          <label>Culoare</label>
          <input
            type="text"
            name="culoare"
            placeholder="Introdu culoare"
            className="border rounded p-2"
          />
          <label>Data salvarii</label>
          <input
            type="date"
            className="border rounded p-2"
            name="dataSalvarii"
          />
          <label>Stare de sanatate</label>
          <input
            type="text"
            name="stareSanatate"
            placeholder="Introdu starea de sanatate"
            className="border rounded p-2"
          />
          <label>Sterilizat</label>
          <select className="border rounded p-2" name="sterilizat">
            <option value="Da">Da</option>
            <option value="Nu">Nu</option>
          </select>
          <label>Disponibil pentru adoptie</label>
          <select className="border rounded p-2" name="disponibilAdoptie">
            <option value="Adoptat">Adoptat</option>
            <option value="In curs de adoptie">In curs de adoptie</option>
            <option value="Liber pentru adoptie">Liber pentru adoptie</option>
          </select>
          <label>Descriere</label>
          <textarea
            placeholder="Introdu descriere"
            name="descriere"
            className="border rounded p-2"
          />

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
