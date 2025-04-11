
import React from "react";
import { Clock, AlertCircle } from "lucide-react";

interface CountdownTimerProps {
  timeRemaining: string;
  isPaused: boolean;
  isWarning: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  isPaused, 
  isWarning 
}) => {
  // Determine text color based on warning state
  const textColorClass = isWarning ? "text-amber-500" : "text-timer-text-primary";
  
  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
      <div className="flex items-center mb-2">
        {isWarning ? (
          <AlertCircle className="w-6 h-6 mr-2 text-amber-500 animate-pulse-soft" />
        ) : (
          <Clock className="w-6 h-6 mr-2 text-timer-highlight" />
        )}
        <span className="text-sm font-medium text-timer-text-secondary">
          {isPaused ? "Timer Paused" : isWarning ? "Almost Time!" : "Time Remaining"}
        </span>
      </div>
      <div className={`text-5xl font-bold tracking-tighter ${textColorClass}`}>
        {timeRemaining}
      </div>
    </div>
  );
};

export default CountdownTimer;
