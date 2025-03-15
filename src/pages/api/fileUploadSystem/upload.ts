import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { file, fileName, fileType } = req.body; // Asigură-te că frontend-ul trimite corect
    const buffer = Buffer.from(file, "base64"); // Dacă trimiți base64 din frontend

    const newFileName = Date.now() + fileName;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: newFileName, // Numele fișierului
      Body: buffer, // Trebuie să ai un `Body` valid!
      ContentType: fileType,
      //ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return res.status(200).json({
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
