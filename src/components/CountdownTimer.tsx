
import React from "react";
import { Clock, AlertCircle } from "lucide-react";

interface CountdownTimerProps {
  timeRemaining: string;
  isPaused: boolean;
  isWarning: boolean;
  isFullscreen?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  isPaused, 
  isWarning,
  isFullscreen = false
}) => {
  // Determine text color based on warning state
  const textColorClass = isWarning ? "text-amber-500" : "text-notion-text";
  
  if (isFullscreen) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className={`text-8xl font-serif tracking-tighter ${textColorClass} transition-colors duration-300`}>
          {timeRemaining}
        </div>
        <div className="mt-4 text-notion-subtle text-lg">
          {isPaused ? "Timer Paused" : isWarning ? "Almost Time!" : "Time Remaining"}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-6 transition-opacity duration-300 ease-in-out">
      <div className="flex items-center mb-2">
        {isWarning ? (
          <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
        ) : (
          <Clock className="w-5 h-5 mr-2 text-notion-subtle" />
        )}
        <span className="text-sm font-normal text-notion-subtle">
          {isPaused ? "Timer Paused" : isWarning ? "Almost Time!" : "Time Remaining"}
        </span>
      </div>
      <div className={`text-5xl font-serif tracking-tighter ${textColorClass} transition-colors duration-300`}>
        {timeRemaining}
      </div>
    </div>
  );
};

export default CountdownTimer;
