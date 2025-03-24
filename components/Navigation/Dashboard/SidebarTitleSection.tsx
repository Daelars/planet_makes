import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

interface TitleSectionProps {
  open: boolean;
}

const SidebarTitleSection = ({ open }: TitleSectionProps) => {
  return (
    <div className="mb-3 border-b border-gray-800 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold text-white">
                TomIsLoading
              </span>
              <span className="block text-xs text-gray-400">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <ChevronDown className="mr-2 text-white" />}
      </div>
    </div>
  );
};

export default SidebarTitleSection;
