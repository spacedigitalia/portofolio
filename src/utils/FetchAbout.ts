import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/about`;

export const fetchAboutContents = async (): Promise<AboutContentProps> => {
  try {
    const data = await apiFetch<AboutContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["about"],
    });
    return data[0];
  } catch (error) {
    console.error("Error fetching about contents:", error);
    throw error;
  }
};
