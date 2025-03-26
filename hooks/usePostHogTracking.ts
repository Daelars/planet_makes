// hooks/usePostHogTracking.ts
import posthog from "posthog-js";
import { 
  SectionName, 
  ProductName, 
  ProductInteractionProps, 
  TimeSpentProps 
} from "@/types/global.types";

export const usePostHogTracking = () => {
  const trackPageView = (pageName: string): void => {
    posthog.capture("page_viewed", { page: pageName });
  };

  const trackSectionView = (section: SectionName): void => {
    posthog.capture("analytics_section_viewed", { section });
  };

  const trackProductInteraction = ({
    product,
    source,
  }: ProductInteractionProps): void => {
    posthog.capture("product_interaction", { product, source });
  };

  const trackTimeSpent = ({ section, time_seconds }: TimeSpentProps): void => {
    posthog.capture("time_spent_on_section", { section, time_seconds });
  };

  return {
    trackPageView,
    trackSectionView,
    trackProductInteraction,
    trackTimeSpent,
  };
};
