import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/skills`;

export const fetchSkillsContents = async (): Promise<SkillsContentProps[]> => {
  try {
    const data = await apiFetch<SkillsContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["skills"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching skills contents:", error);
    throw error;
  }
};  
