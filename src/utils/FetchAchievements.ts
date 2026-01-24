import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/achievements`;

export const fetchAchievementsContents = async (): Promise<
  AchievementsContentProps[]
> => {
  try {
    const data = await apiFetch<AchievementsContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["achievements"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching achievements contents:", error);
    throw error;
  }
};
