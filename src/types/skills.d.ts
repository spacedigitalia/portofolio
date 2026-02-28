type SkillCategory = 'fe' | 'be' | 'tools';

interface SkillsContentProps {
  _id?: string;
  title: string;
  imageUrl: string;
  category?: SkillCategory;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TechSkillProps {
  skillsData: SkillsContentProps[];
}
