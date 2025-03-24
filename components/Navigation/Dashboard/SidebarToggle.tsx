import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ToggleCloseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarToggle = ({ open, setOpen }: ToggleCloseProps) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-800 transition-colors hover:bg-gray-800"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${
              open && "rotate-180"
            } text-white`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-white"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default SidebarToggle;
