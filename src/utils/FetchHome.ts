import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/home`;

export const fetchHomeContents = async (): Promise<HomeContentProps[]> => {
  try {
    const data = await apiFetch<HomeContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["home"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching home contents:", error);
    throw error;
  }
};
