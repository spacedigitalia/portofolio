import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/projects`;

export const fetchProjectsContents = async (): Promise<
  ProjectsContentProps[]
> => {
  try {
    const data = await apiFetch<ProjectsContentProps[]>(API_URL, {
      revalidate: 3600,
      tags: ["projects"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching projects contents:", error);
    throw error;
  }
};

export const fetchProjectBySlug = async (
  slug: string
): Promise<ProjectDetails> => {
  try {
    const data = await apiFetch<ProjectDetails>(`${API_URL}/${slug}`, {
      tags: ["projects"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    // Check if it's a 404 error
    if (error instanceof Error && (error as any).status === 404) {
      throw new Error(`Project with slug "${slug}" not found`);
    }
    throw error;
  }
};
