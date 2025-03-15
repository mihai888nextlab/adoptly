import { useState } from "react";

export default function Upload() {
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

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 border rounded-lg shadow-md">
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

      {uploadedUrl && (
        <div>
          <p className="text-green-500">✅ Upload reușit!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Vezi imaginea
          </a>
        </div>
      )}
    </div>
  );
}
