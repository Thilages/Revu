import { useState,useRef,useEffect } from "react";
import { Search, ChevronDown, MoveRight, Zap } from 'lucide-react';


const categoryIcons = {
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><line x1="12" x2="12" y1="18" y2="18"></line></svg>
  ),
  laptop: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" ry="2"></rect><line x1="2" x2="22" y1="19" y2="19"></line></svg>
  ),
  watch: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>
  ),
  airpods: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6.5a4.5 4.5 0 0 1 7.4-3.7c.3.4.3.9 0 1.3l-3.6 4.4a2 2 0 0 1-2.8 0L6 6.5Z"></path><path d="M18 19.5a4.5 4.5 0 0 0-7.4-3.7c-.3-.4-.3-.9 0-1.3l3.6-4.4a2 2 0 0 1 2.8 0L18 19.5Z"></path></svg>
  ),
};
const Dropdown = ({ selected, setSelected }) => {
  const [open, setopen] = useState(false);
  const dropdown = useRef(null);
  const categories = ["mobile", "laptop", "watch", "airpods"];

  return (
    <div className="relative w-full md:w-48" ref={dropdown}>
      <button
        onClick={() => setopen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      >
        <span className="flex items-center gap-3">
          {categoryIcons[selected]}
          {selected}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-10 w-full mb-2 bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl animate-fade-in-up" style={{ bottom: "100%" }}>
          <ul className="py-1">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  setSelected(category);
                  setopen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-white/80 hover:bg-cyan-500/10 cursor-pointer transition-colors duration-200"
              >
                {categoryIcons[category]}
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};




export default Dropdown;