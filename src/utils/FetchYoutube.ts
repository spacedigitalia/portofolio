import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/youtube`;

export const fetchYoutubeContents = async (): Promise<
  YoutubeContentProps[]
> => {
  try {
    const data = await apiFetch<YoutubeContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["youtube"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching youtube contents:", error);
    throw error;
  }
};
