"use server";
import { put } from "@vercel/blob";

export const uploadImg = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const filename = file.name;

  const blob = await put(filename, file, {
    access: "public",
  });
  console.log(blob.url);
  return blob.url;
};
