"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Sun, Moon } from "lucide-react";

const ToggleDarkandLight = () => {
  const [isDarkMode, setisDarkMode] = useState(true);
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="cursor-pointer"
            onClick={() => {
              setisDarkMode((prevValue) => !prevValue);
              document.body.classList.toggle("dark");
            }}
          >
            {isDarkMode ? <Moon /> : <Sun />}
          </TooltipTrigger>
          <TooltipContent>
            {isDarkMode ? <p>Enable dark Mode</p> : <p>Enable light Mode</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToggleDarkandLight;
