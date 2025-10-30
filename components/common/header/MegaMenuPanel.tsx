"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  label: string;
  href?: string;
  description?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type MegaMenuPanelProps = {
  groups?: MenuGroup[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const widthClassByGroups = (groupCount: number): string => {
  if (groupCount <= 1) return "w-[360px]";
  if (groupCount === 2) return "w-[560px]";
  return "w-[720px]";
};

const gridColsByGroups = (groupCount: number): string => {
  if (groupCount <= 1) return "grid-cols-1";
  if (groupCount === 2) return "grid-cols-2";
  return "grid-cols-2 lg:grid-cols-3";
};

const MegaMenuPanel = ({ groups, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) => {
  const groupList: MenuGroup[] = Array.isArray(groups) ? groups : [];
  const groupCount = groupList.length;
  const widthClass = widthClassByGroups(groupCount);
  const gridColsClass = gridColsByGroups(groupCount);

  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 mt-3 ${widthClass} max-w-[90vw]`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div className="rounded-2xl border border-black/5 bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 overflow-hidden">
        <div className={`grid ${gridColsClass} gap-6 p-6`}>
          {groupList.map((group) => (
            <div key={group.title} className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{group.title}</div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href || "#"} className="group block rounded-lg p-3 hover:bg-orange-50">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-orange-600 truncate">{item.label}</span>
                        <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400 shrink-0" />
                      </div>
                      {item.description && <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default MegaMenuPanel;