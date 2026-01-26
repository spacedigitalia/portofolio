interface ProjectsContentProps {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface Framework {
  title: string;
  imageUrl: string;
}

interface PreviewProps {
  previewProject: ProjectsContentProps | null;
  setPreviewProject: (project: ProjectsContentProps | null) => void;
}

//============ Projects Details ============//
interface ProjectDetails {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  relatedProjects: RelatedProject[];
}

interface RelatedProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  previewLink: string;
}

interface ProjectsLayoutProps {
  slug: string;
  productsData: ProjectDetails;
}

interface ProjectActionsProps {
  project: ProjectsContentProps;
  onViewDetails: (slug: string, title?: string) => void;
  onPreview: (project: ProjectsContentProps) => void;
  showLiveDemo?: boolean;
}

interface ProjectCardProps {
  project: ProjectsContentProps;
  index: number;
  isActive: boolean;
  onViewDetails: (slug: string, title?: string) => void;
  onPreview: (project: ProjectsContentProps) => void;
  onToggleActive?: (index: number) => void;
  showLiveDemo?: boolean;
  overflowVisible?: boolean;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

interface ProjectsGridProps {
  topProject: ProjectsContentProps | undefined;
  middleProjects: ProjectsContentProps[];
  bottomProjects: ProjectsContentProps[];
  activeIndex: number;
  onViewDetails: (slug: string, title?: string) => void;
  onPreview: (project: ProjectsContentProps) => void;
}

interface ProjectsHeaderProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showMoreCategories: boolean;
  setShowMoreCategories: (show: boolean) => void;
  hasMoreCategories: boolean;
  visibleCategories: string[];
  hiddenCategories: string[];
  isSelectedCategoryHidden: boolean;
  handleCategorySelect: (category: string) => void;
  headerDropdownRef: React.RefObject<HTMLDivElement | null>;
  headerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

interface ProjectsMobileProps {
  displayedProjects: ProjectsContentProps[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onViewDetails: (slug: string, title?: string) => void;
  onPreview: (project: ProjectsContentProps) => void;
}
