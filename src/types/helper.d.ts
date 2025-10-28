type LoadingType = "projects" | "articles" | "contacts" | "general";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  loadingType: LoadingType;
  showLoading: (message?: string, type?: LoadingType) => void;
  hideLoading: () => void;
  isInitialLoading: boolean;
}

// FlowingMenu
interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

// BlurText
interface AnimationState {
  filter?: string;
  opacity?: number;
  y?: number;
  [key: string]: any;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationState;
  animationTo?: AnimationState[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: React.ElementType;
  loading?: boolean;
  initialDelay?: number;
}

// PixelTransition
interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  trigger?: "auto" | "hover" | "click";
}

// ScrambledText
interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

// ShinyText
interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

interface LoadingOverlayProps {
  isLoading?: boolean;
  message?: string;
  className?: string;
}

interface MangcodingStyleSplashProps {
  isLoading: boolean;
  message?: string;
  messages?: string[];
  messageDurationsMs?: number | number[];
  loop?: boolean;
  mode?: "messages-only" | "full";
  textEffect?: "fade" | "typewriter" | "slide";
  typewriterSpeedMs?: number;
  typewriterHoldMs?: number;
  onSequenceComplete?: () => void;
  className?: string;
}

// removed specific overlay props in favor of generic LoadingOverlayProps

// LenisProvider
interface LenisProviderProps {
  children: React.ReactNode;
}

// Theme
interface ThemeSwitchOverlayProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}
